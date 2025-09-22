import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

const ContactSectionEditor = ({ token }) => {
  const [contactData, setContactData] = useState({
    contactMethods: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/contact');
      const data = await response.json();
      
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os dados da seção de contato.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactMethodChange = (index, field, value) => {
    const updatedMethods = [...contactData.contactMethods];
    updatedMethods[index] = {
      ...updatedMethods[index],
      [field]: value
    };
    setContactData(prev => ({
      ...prev,
      contactMethods: updatedMethods
    }));
  };

  const addContactMethod = () => {
    const newMethod = {
      type: 'email',
      title: '',
      description: '',
      info: '',
      order: contactData.contactMethods.length + 1
    };
    setContactData(prev => ({
      ...prev,
      contactMethods: [...prev.contactMethods, newMethod]
    }));
  };

  const removeContactMethod = (index) => {
    const updatedMethods = contactData.contactMethods.filter((_, i) => i !== index);
    setContactData(prev => ({
      ...prev,
      contactMethods: updatedMethods
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/content/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Seção salva com sucesso!',
          description: 'As alterações na seção de contato foram aplicadas.',
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
        <CardTitle>Editar Seção de Contato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Métodos de Contato</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addContactMethod}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Método
            </Button>
          </div>

          {contactData.contactMethods.map((method, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Método {index + 1}</h4>
                  {contactData.contactMethods.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeContactMethod(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select
                      value={method.type}
                      onValueChange={(value) => handleContactMethodChange(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="phone">Telefone</SelectItem>
                        <SelectItem value="address">Endereço</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input
                      value={method.title}
                      onChange={(e) => handleContactMethodChange(index, 'title', e.target.value)}
                      placeholder="Ex: E-mail, Telefone, Endereço"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={method.description}
                    onChange={(e) => handleContactMethodChange(index, 'description', e.target.value)}
                    placeholder="Descrição do método de contato..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Informação de Contato</Label>
                  <Input
                    value={method.info}
                    onChange={(e) => handleContactMethodChange(index, 'info', e.target.value)}
                    placeholder="Ex: email@exemplo.com, (11) 1234-5678, Rua Exemplo, 123"
                  />
                </div>
              </div>
            </Card>
          ))}
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

export default ContactSectionEditor;