import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

const ImageManager = ({ token }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/upload/images', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data.files || []);
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar imagens',
        description: 'Não foi possível carregar a lista de imagens.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    
    setIsUploading(true);

    try {
      const response = await fetch('http://localhost:3001/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Imagem enviada com sucesso!',
          description: `A imagem ${data.originalName} foi enviada.`,
        });
        fetchImages(); // Refresh the list
      } else {
        toast({
          title: 'Erro no upload',
          description: data.message || 'Não foi possível enviar a imagem.',
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
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (filename) => {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/upload/image/${filename}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({
          title: 'Imagem excluída',
          description: 'A imagem foi removida com sucesso.',
        });
        fetchImages(); // Refresh the list
      } else {
        const data = await response.json();
        toast({
          title: 'Erro ao excluir',
          description: data.message || 'Não foi possível excluir a imagem.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível conectar ao servidor.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (url) => {
    const fullUrl = `http://localhost:3001${url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast({
        title: 'URL copiada!',
        description: 'A URL da imagem foi copiada para a área de transferência.',
      });
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <CardTitle>Gerenciar Imagens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
            disabled={isUploading}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              {isUploading ? (
                <Loader2 className="w-12 h-12 animate-spin text-gray-400" />
              ) : (
                <Upload className="w-12 h-12 text-gray-400" />
              )}
              <div>
                <p className="text-lg font-medium">
                  {isUploading ? 'Enviando imagem...' : 'Clique para enviar uma imagem'}
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF, WEBP até 5MB
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* Images Grid */}
        {images.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600">
              Nenhuma imagem enviada ainda
            </p>
            <p className="text-sm text-gray-500">
              Envie sua primeira imagem usando o campo acima
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card key={image.filename} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={`http://localhost:3001${image.url}`}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm truncate" title={image.filename}>
                      {image.filename}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(image.size)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(image.uploadDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(image.url)}
                      className="flex-1 text-xs"
                    >
                      Copiar URL
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.filename)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageManager;