import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Settings, Home, DollarSign, Phone, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HeroSectionEditor from '@/components/admin/HeroSectionEditor';
import ServicesSectionEditor from '@/components/admin/ServicesSectionEditor';
import PricingSectionEditor from '@/components/admin/PricingSectionEditor';
import ContactSectionEditor from '@/components/admin/ContactSectionEditor';
import ImageManager from '@/components/admin/ImageManager';

const AdminDashboard = ({ user, token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Painel Administrativo
            </h1>
            <p className="text-sm text-muted-foreground">
              Rede Feminina - Gerenciamento de Conteúdo
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Bem-vindo, {user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="hero" className="gap-2">
                  <Home className="w-4 h-4" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="services" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Serviços
                </TabsTrigger>
                <TabsTrigger value="pricing" className="gap-2">
                  <DollarSign className="w-4 h-4" />
                  Doações
                </TabsTrigger>
                <TabsTrigger value="contact" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Contato
                </TabsTrigger>
                <TabsTrigger value="images" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Imagens
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="hero">
                  <HeroSectionEditor token={token} />
                </TabsContent>

                <TabsContent value="services">
                  <ServicesSectionEditor token={token} />
                </TabsContent>

                <TabsContent value="pricing">
                  <PricingSectionEditor token={token} />
                </TabsContent>

                <TabsContent value="contact">
                  <ContactSectionEditor token={token} />
                </TabsContent>

                <TabsContent value="images">
                  <ImageManager token={token} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;