import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Heart, CreditCard, Repeat, ExternalLink, Loader2 } from "lucide-react";
import { createSingleDonation, createRecurringDonation } from "@/api/donations";

export default function DonationsPage() {
  const [donationType, setDonationType] = useState<"single" | "recurring">("single");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorDocument, setDonorDocument] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const { toast } = useToast();

  const predefinedAmounts = [10, 25, 50, 100, 200];

  const handleAmountClick = (value: number) => {
    setAmount(String(value));
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("");
  };

  const getFinalAmount = () => {
    const value = customAmount || amount;
    return parseFloat(value) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();

    if (finalAmount < 1) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor de doação válido (mínimo R$ 1,00).",
        variant: "destructive",
      });
      return;
    }

    if (!donorEmail) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, informe seu email para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPaymentUrl("");

    try {
      const donationData = {
        amount: finalAmount,
        donorName: donorName || undefined,
        donorEmail,
        donorPhone: donorPhone || undefined,
        donorDocument: donorDocument || undefined,
        message: message || undefined,
      };

      let response: any;

      if (donationType === "single") {
        response = await createSingleDonation(donationData);
      } else {
        response = await createRecurringDonation(donationData);
      }

      if (response?.success) {
        const url = response.data?.paymentUrl || response.data?.subscriptionUrl;
        if (url) {
          setPaymentUrl(url);
          toast({
            title: "Link de pagamento gerado!",
            description: "Clique no botão abaixo para finalizar sua doação no Mercado Pago.",
          });
        } else {
          throw new Error("URL de pagamento não retornada");
        }
      } else {
        throw new Error(response?.message || "Erro ao processar doação");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao processar doação",
        description: error?.message || "Não foi possível processar sua doação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
              Faça sua Doação
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Sua contribuição ajuda a transformar vidas. Escolha a forma de doar que mais se adequa a você.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Coluna Esquerda - Tipo e Valor */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-500" />
                      Tipo de Doação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={donationType} onValueChange={(v) => setDonationType(v as "single" | "recurring")}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="font-semibold">Doação Única</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Faça uma doação pontual via Mercado Pago</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <RadioGroupItem value="recurring" id="recurring" />
                        <Label htmlFor="recurring" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Repeat className="w-4 h-4" />
                            <span className="font-semibold">Doação Recorrente (Assinatura)</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Apoie mensalmente de forma automática</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Valor da Doação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {predefinedAmounts.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={amount === String(value) ? "default" : "outline"}
                          onClick={() => handleAmountClick(value)}
                          className="h-16"
                        >
                          R$ {value}
                        </Button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="customAmount">Ou insira outro valor</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="R$ 0,00"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>

                    {donationType === "recurring" && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <strong>Doação Recorrente Mensal:</strong> Você será cobrado automaticamente todo mês no valor selecionado.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Coluna Direita - Dados e Botão */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Seus Dados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="donorName">Nome (opcional)</Label>
                      <Input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Seu nome" />
                    </div>
                    <div>
                      <Label htmlFor="donorEmail">Email *</Label>
                      <Input id="donorEmail" type="email" required value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="seu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="donorPhone">Telefone (opcional)</Label>
                      <Input id="donorPhone" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} placeholder="(11) 99999-9999" />
                    </div>
                    <div>
                      <Label htmlFor="donorDocument">CPF (opcional)</Label>
                      <Input id="donorDocument" value={donorDocument} onChange={(e) => setDonorDocument(e.target.value)} placeholder="000.000.000-00" />
                    </div>
                    <div>
                      <Label htmlFor="message">Mensagem (opcional)</Label>
                      <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Deixe uma mensagem de apoio..." rows={3} />
                    </div>
                  </CardContent>
                </Card>

                {!paymentUrl ? (
                  <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-lg py-6">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        {donationType === "single" ? "Gerar Link de Pagamento" : "Criar Assinatura"}
                      </>
                    )}
                  </Button>
                ) : (
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="text-green-600 dark:text-green-400">
                          <Heart className="w-12 h-12 mx-auto mb-2" />
                          <h3 className="text-xl font-bold">Link de Pagamento Gerado!</h3>
                          <p className="text-sm mt-2">Clique no botão abaixo para finalizar sua doação no Mercado Pago</p>
                        </div>
                        <Button onClick={handleOpenPayment} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6">
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Abrir Mercado Pago
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
