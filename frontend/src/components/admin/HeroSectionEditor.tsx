import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

const HeroSectionEditor = ({ token }) => {
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    images: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/content/hero');
      const data = await response.json();
      
      if (response.ok) {
        setHeroData(data);
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os dados da seção hero.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/content/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(heroData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Seção salva com sucesso!',
          description: 'As alterações na seção hero foram aplicadas.',
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
        <CardTitle>Editar Seção Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título Principal</Label>
            <Input
              id="title"
              name="title"
              value={heroData.title}
              onChange={handleInputChange}
              placeholder="Ex: Juntos por vidas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={heroData.subtitle}
              onChange={handleInputChange}
              placeholder="Ex: mais fortes"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            value={heroData.description}
            onChange={handleInputChange}
            placeholder="Descrição da seção hero..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="buttonText">Texto do Botão</Label>
            <Input
              id="buttonText"
              name="buttonText"
              value={heroData.buttonText}
              onChange={handleInputChange}
              placeholder="Ex: Contribua"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buttonLink">Link do Botão</Label>
            <Input
              id="buttonLink"
              name="buttonLink"
              value={heroData.buttonLink}
              onChange={handleInputChange}
              placeholder="Ex: #contato ou https://..."
            />
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

export default HeroSectionEditor;