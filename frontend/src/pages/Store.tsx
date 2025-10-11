import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getProducts } from "@/api/store";

export default function StorePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const categories = [
    { value: "all", label: "Todas as categorias" },
    { value: "calçados", label: "Calçados" },
    { value: "decoração", label: "Decoração" },
    { value: "roupas", label: "Roupas" },
    { value: "acessórios", label: "Acessórios" },
    { value: "outros", label: "Outros" },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response: any = await getProducts();
        if (response?.success) {
          const transformed = (response.data || []).map((item: any) => ({
            _id: item.id,
            images: item.imageUrls?.length ? item.imageUrls : ["/placeholder-cause.jpg"],
            name: item.name,
            category: item.category ? String(item.category).toLowerCase() : "outros",
            price: item.price,
            description: item.description || "",
            stock: item.stock || 0,
          }));
          setProducts(transformed);
          setFilteredProducts(transformed);
        } else {
          throw new Error("Erro ao carregar produtos");
        }
      } catch (err: any) {
        toast({ title: "Erro ao carregar produtos", description: err?.message || "Tente novamente mais tarde.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [toast]);

  const normalizeText = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    const id = setTimeout(() => {
      let results = products || [];
      if (searchTerm.trim()) {
        setIsSearching(true);
        const q = normalizeText(searchTerm.trim());
        results = results.filter((p) => normalizeText(p.name).includes(q));
        setIsSearching(false);
      }
      if (selectedCategory !== "all") {
        results = results.filter((p) => p.category === selectedCategory);
      }
      setFilteredProducts(results);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTerm, selectedCategory, products]);

  const formatPrice = (price: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

  const ProductSkeleton = () => (
    <Card className="animate-pulse">
      <div className={`bg-gray-200 dark:bg-gray-700 rounded-t-lg ${isMobile ? "h-40" : "h-48"}`}></div>
      <CardContent className={`${isMobile ? "p-2" : "p-4"}`}>
        <div className={`bg-gray-200 dark:bg-gray-700 rounded mb-2 ${isMobile ? "h-4" : "h-6"}`}></div>
        <div className={`bg-gray-200 dark:bg-gray-700 rounded w-1/2 ${isMobile ? "h-3" : "h-4"}`}></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-2 md:py-4 px-3 md:px-6 flex-1">
        <div className="text-center mb-6 md:mb-8">
          <h1 className={`font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent !leading-tight ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'}`}>Bazar Solidário</h1>
          <p className={`text-gray-600 dark:text-gray-300 mt-2 ${isMobile ? 'text-sm' : 'text-lg'}`}>Produtos que apoiam uma grande causa!</p>
        </div>

        <Card className="mb-6 md:mb-8 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
          <CardContent className={`${isMobile ? 'p-3' : 'p-6'}`}>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                <Input placeholder="Buscar pelo nome do produto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`${isMobile ? 'pl-9 h-9 text-sm' : 'pl-10 h-10'}`} />
              </div>
              <div className={`${isMobile ? 'w-full' : 'md:w-64'}`}>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`${isMobile ? 'h-9' : 'h-10'}`}>
                    <Filter className={`mr-2 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading || isSearching ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product._id} className="overflow-hidden h-full flex flex-col group cursor-pointer hover:shadow-xl transition-shadow duration-300" style={{ zIndex: 1 }}>
                <div className={`relative overflow-hidden ${isMobile ? 'h-40' : 'h-60'}`}>
                  <Carousel opts={{ loop: true }} className="w-full h-full">
                    <CarouselContent className="w-full h-full">
                      {product.images.map((image: string, index: number) => (
                        <CarouselItem key={index} className="w-full h-full">
                          <img src={image || "/placeholder-cause.jpg"} alt={`${product.name} - Image ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {product.images.length > 1 && !isMobile && (
                      <>
                        <CarouselPrevious className="left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800" style={{ pointerEvents: "auto" }} />
                        <CarouselNext className="right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800" style={{ pointerEvents: "auto" }} />
                      </>
                    )}
                  </Carousel>
                </div>
                <Link to={`/produto/${product._id}`}>
                  <CardContent className={`flex-grow flex flex-col justify-between ${isMobile ? 'p-2' : 'p-4'}`}>
                    <div>
                      <span className={`text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full ${isMobile ? 'text-[10px]' : ''}`}>
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                      <h3 className={`font-semibold text-gray-900 dark:text-white my-2 line-clamp-2 ${isMobile ? 'text-sm leading-tight' : 'text-lg'}`}>
                        {product.name}
                      </h3>
                    </div>
                    <span className={`font-bold text-pink-600 ${isMobile ? 'text-base' : 'text-xl'}`}>
                      {formatPrice(product.price)}
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Nenhum produto encontrado</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
