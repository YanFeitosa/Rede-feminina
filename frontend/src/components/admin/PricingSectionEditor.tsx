import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

const PricingSectionEditor = ({ token }) => {
  const [pricingData, setPricingData] = useState({
    sectionSubtitle: '',
    title: '',
    description: '',
    donationTitle: '',
    donationDescription: '',
    donationCardTitle: '',
    donationCardDescription: '',
    buttonText: '',
    buttonLink: '',
    pixKey: '',
    bankInfo: {
      bank: '',
      agency: '',
      account: '',
      accountHolder: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/pricing');
      const data = await response.json();
      
      if (response.ok) {
        setPricingData(data);
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os dados da seção de doações.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBankInfoChange = (e) => {
    const { name, value } = e.target;
    setPricingData(prev => ({
      ...prev,
      bankInfo: {
        ...prev.bankInfo,
        [name]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/content/pricing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pricingData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Seção salva com sucesso!',
          description: 'As alterações na seção de doações foram aplicadas.',
        });
      } else {
        toast({
          title: 'Erro ao salvar',
          description: data.message || 'Não foi possível salvar as alterações.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível conectar ao servidor.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Seção de Doações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sectionSubtitle">Subtítulo da Seção</Label>
          <Input
            id="sectionSubtitle"
            name="sectionSubtitle"
            value={pricingData.sectionSubtitle}
            onChange={handleInputChange}
            placeholder="Ex: SUA AJUDA FAZ A DIFERENÇA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Título Principal</Label>
          <Input
            id="title"
            name="title"
            value={pricingData.title}
            onChange={handleInputChange}
            placeholder="Ex: Apoie. Inspire. Transforme vidas."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição Principal</Label>
          <Textarea
            id="description"
            name="description"
            value={pricingData.description}
            onChange={handleInputChange}
            placeholder="Descrição principal da seção..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="donationTitle">Título das Doações</Label>
            <Input
              id="donationTitle"
              name="donationTitle"
              value={pricingData.donationTitle}
              onChange={handleInputChange}
              placeholder="Ex: Doações Esporádicas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donationCardTitle">Título do Card de Doação</Label>
            <Input
              id="donationCardTitle"
              name="donationCardTitle"
              value={pricingData.donationCardTitle}
              onChange={handleInputChange}
              placeholder="Ex: Contribua de forma rápida e segura"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="donationDescription">Descrição das Doações</Label>
          <Textarea
            id="donationDescription"
            name="donationDescription"
            value={pricingData.donationDescription}
            onChange={handleInputChange}
            placeholder="Descrição das doações..."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="donationCardDescription">Descrição do Card de Doação</Label>
          <Textarea
            id="donationCardDescription"
            name="donationCardDescription"
            value={pricingData.donationCardDescription}
            onChange={handleInputChange}
            placeholder="Descrição do card de doação..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="buttonText">Texto do Botão</Label>
            <Input
              id="buttonText"
              name="buttonText"
              value={pricingData.buttonText}
              onChange={handleInputChange}
              placeholder="Ex: Doar agora via Pix"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pixKey">Chave PIX</Label>
            <Input
              id="pixKey"
              name="pixKey"
              value={pricingData.pixKey}
              onChange={handleInputChange}
              placeholder="Ex: 12345678901 ou email@exemplo.com"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informações Bancárias</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Banco</Label>
              <Input
                id="bank"
                name="bank"
                value={pricingData.bankInfo.bank}
                onChange={handleBankInfoChange}
                placeholder="Ex: Banco do Brasil"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agency">Agência</Label>
              <Input
                id="agency"
                name="agency"
                value={pricingData.bankInfo.agency}
                onChange={handleBankInfoChange}
                placeholder="Ex: 1234-5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Conta</Label>
              <Input
                id="account"
                name="account"
                value={pricingData.bankInfo.account}
                onChange={handleBankInfoChange}
                placeholder="Ex: 12345-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">Titular da Conta</Label>
              <Input
                id="accountHolder"
                name="accountHolder"
                value={pricingData.bankInfo.accountHolder}
                onChange={handleBankInfoChange}
                placeholder="Ex: Rede Feminina LTDA"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSectionEditor;