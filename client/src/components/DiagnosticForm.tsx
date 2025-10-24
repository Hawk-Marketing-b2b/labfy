import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface DiagnosticFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nome: string;
  telefone: string;
  empresa: string;
  email: string;
  faturamento: string;
  segmento: string;
  utm_source: string;
  utm_campaign: string;
  utm_content: string;
  utm_medium: string;
  utm_term: string;
}

const steps = [
  { id: 1, title: "Informações Pessoais", fields: ["nome", "telefone", "email"] },
  { id: 2, title: "Informações da Empresa", fields: ["empresa", "faturamento"] },
  { id: 3, title: "Segmento", fields: ["segmento"] },
];

const faturamentoOptions = [
  "Até R$ 100 mil/mês",
  "R$ 100 mil - R$ 500 mil/mês",
  "R$ 500 mil - R$ 1 milhão/mês",
  "R$ 1 milhão - R$ 5 milhões/mês",
  "Acima de R$ 5 milhões/mês",
];

const segmentoOptions = [
  "Tecnologia",
  "E-commerce",
  "Serviços Financeiros",
  "Saúde",
  "Educação",
  "Varejo",
  "Indústria",
  "Logística",
  "Outro",
];

export default function DiagnosticForm({
  isOpen,
  onClose,
}: DiagnosticFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    email: "",
    empresa: "",
    faturamento: "",
    segmento: "",
    utm_source: "",
    utm_campaign: "",
    utm_content: "",
    utm_medium: "",
    utm_term: "",
  });

  // Capturar UTMs da URL ao montar o componente
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utm_source: urlParams.get("utm_source") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_term: urlParams.get("utm_term") || "",
    }));
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep - 1].fields;
    return currentFields.every((field) => {
      const value = formData[field as keyof FormData].trim();
      if (field === "email") {
        // basic email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(value);
      }
      return value !== "";
    });
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      toast.error("Por favor, preencha todos os campos");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Enviar dados para o webhook
      const response = await fetch("https://n8n-n8n-start.t4r0vc.easypanel.host/webhook/labfy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully:", formData);
        setIsSubmitted(true);
        toast.success("Diagnóstico solicitado com sucesso!");
        
        // Reset after 3 seconds
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        throw new Error("Falha ao enviar formulário");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao enviar formulário. Tente novamente.");
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      empresa: "",
      faturamento: "",
      segmento: "",
      utm_source: "",
      utm_campaign: "",
      utm_content: "",
      utm_medium: "",
      utm_term: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card border-2 border-green-500 rounded-2xl p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {steps.map((step) => (
                      <div
                        key={step.id}
                        className={`w-full h-2 rounded-full mx-1 transition-all ${
                          step.id <= currentStep
                            ? "bg-green-500"
                            : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/60 text-center">
                    Etapa {currentStep} de {steps.length}
                  </p>
                </div>

                {/* Step Title */}
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {steps[currentStep - 1].title}
                </h2>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStep === 1 && (
                        <>
                          <div>
                            <Label htmlFor="nome">Nome Completo</Label>
                            <Input
                              id="nome"
                              type="text"
                              placeholder="Seu nome"
                              value={formData.nome}
                              onChange={(e) =>
                                handleInputChange("nome", e.target.value)
                              }
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu@exemplo.com"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                              id="telefone"
                              type="tel"
                              placeholder="(00) 00000-0000"
                              value={formData.telefone}
                              onChange={(e) =>
                                handleInputChange("telefone", e.target.value)
                              }
                              className="mt-2"
                            />
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div>
                            <Label htmlFor="empresa">Nome da Empresa</Label>
                            <Input
                              id="empresa"
                              type="text"
                              placeholder="Sua empresa"
                              value={formData.empresa}
                              onChange={(e) =>
                                handleInputChange("empresa", e.target.value)
                              }
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="faturamento">
                              Faturamento Mensal
                            </Label>
                            <Select
                              value={formData.faturamento}
                              onValueChange={(value) =>
                                handleInputChange("faturamento", value)
                              }
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Selecione o faturamento" />
                              </SelectTrigger>
                              <SelectContent>
                                {faturamentoOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {currentStep === 3 && (
                        <div>
                          <Label htmlFor="segmento">Segmento de Atuação</Label>
                          <Select
                            value={formData.segmento}
                            onValueChange={(value) =>
                              handleInputChange("segmento", value)
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Selecione o segmento" />
                            </SelectTrigger>
                            <SelectContent>
                              {segmentoOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    {currentStep === steps.length ? "Enviar" : "Próximo"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            ) : (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Sucesso!</h2>
                <p className="text-foreground/70 mb-6">
                  Recebemos sua solicitação de diagnóstico. Entraremos em
                  contato em breve!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

