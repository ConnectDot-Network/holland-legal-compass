
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Briefcase, Shield, Home, Phone, Globe, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const FirstStepsHolland = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  const categories = [
    { id: 'work', name: t("workOffices"), icon: Briefcase, color: 'bg-blue-600' },
    { id: 'insurance', name: t("insurance"), icon: Shield, color: 'bg-green-600' },
    { id: 'housing', name: t("housing"), icon: Home, color: 'bg-purple-600' },
    { id: 'telecom', name: t("telecom"), icon: Phone, color: 'bg-orange-600' },
    { id: 'banking', name: t("banking"), icon: Globe, color: 'bg-red-600' }
  ];

  const regions = [
    'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 
    'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'
  ];

  const services = {
    work: [
      {
        name: 'Randstad',
        description: 'Największa agencja pracy w Holandii',
        website: 'randstad.nl',
        phone: '088-1150000',
        rating: 4.2,
        services: ['Praca tymczasowa', 'Stała praca', 'Konsultacje'],
        locations: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag']
      },
      {
        name: 'Adecco',
        description: 'Międzynarodowa agencja zatrudnienia',
        website: 'adecco.nl',
        phone: '088-2233000',
        rating: 4.0,
        services: ['Rekrutacja', 'Szkolenia', 'HR Solutions'],
        locations: ['Amsterdam', 'Rotterdam', 'Eindhoven']
      },
      {
        name: 'Tempo-Team',
        description: 'Specjalizacja w pracy przemysłowej i logistycznej',
        website: 'tempo-team.nl',
        phone: '088-5007000',
        rating: 3.8,
        services: ['Praca w magazynie', 'Produkcja', 'Transport'],
        locations: ['Rotterdam', 'Tilburg', 'Breda']
      }
    ],
    insurance: [
      {
        name: 'Zilveren Kruis',
        description: 'Podstawowe ubezpieczenie zdrowotne',
        website: 'zilverenkruis.nl',
        phone: '088-0309000',
        rating: 4.1,
        services: ['Zorgverzekering', 'Tandartsverzekering', 'Aanvullende'],
        locations: ['Cała Holandia']
      },
      {
        name: 'VGZ',
        description: 'Ubezpieczenia zdrowotne i dodatkowe',
        website: 'vgz.nl',
        phone: '088-1191911',
        rating: 3.9,
        services: ['Basis verzekering', 'Aanvullende verzekering'],
        locations: ['Cała Holandia']
      },
      {
        name: 'Independer',
        description: 'Porównywarka ubezpieczeń',
        website: 'independer.nl',
        phone: '088-0045000',
        rating: 4.3,
        services: ['Porównanie cen', 'Doradztwo', 'Przełączanie'],
        locations: ['Online']
      }
    ],
    housing: [
      {
        name: 'Funda',
        description: 'Największy portal mieszkaniowy',
        website: 'funda.nl',
        phone: '020-5154000',
        rating: 4.4,
        services: ['Wynajem', 'Kupno', 'Wycena'],
        locations: ['Cała Holandia']
      },
      {
        name: 'Kamernet',
        description: 'Portal pokoi i mieszkań studenckich',
        website: 'kamernet.nl',
        phone: '020-2620777',
        rating: 4.0,
        services: ['Pokoje', 'Współlokatorzy', 'Krótkoterminowy wynajem'],
        locations: ['Miasta studenckie']
      },
      {
        name: 'Pararius',
        description: 'Profesjonalny wynajem mieszkań',
        website: 'pararius.nl',
        phone: '020-2616410',
        rating: 4.2,
        services: ['Wynajem długoterminowy', 'Umeblowane', 'Ekspat housing'],
        locations: ['Główne miasta']
      }
    ],
    telecom: [
      {
        name: 'KPN',
        description: 'Największy operator telekomunikacyjny',
        website: 'kpn.com',
        phone: '0800-0402',
        rating: 3.8,
        services: ['Internet', 'Telefon', 'TV', 'Mobilny'],
        locations: ['Cała Holandia']
      },
      {
        name: 'Ziggo',
        description: 'Operator kablowy i internetowy',
        website: 'ziggo.nl',
        phone: '0900-1884',
        rating: 3.6,
        services: ['Internet kablowy', 'TV', 'Telefon'],
        locations: ['Większość miast']
      },
      {
        name: 'T-Mobile',
        description: 'Operator sieci komórkowej',
        website: 't-mobile.nl',
        phone: '0800-8255',
        rating: 4.0,
        services: ['Telefon komórkowy', 'Internet mobilny', 'Abonamenty'],
        locations: ['Cała Holandia']
      }
    ],
    banking: [
      {
        name: 'ING Bank',
        description: 'Bank przyjazny dla expatów',
        website: 'ing.nl',
        phone: '088-4646464',
        rating: 4.1,
        services: ['Konto osobiste', 'Kredyty', 'Ubezpieczenia'],
        locations: ['Cała Holandia']
      },
      {
        name: 'ABN AMRO',
        description: 'Jeden z największych banków holenderskich',
        website: 'abnamro.nl',
        phone: '088-2261100',
        rating: 3.9,
        services: ['Konto bankowe', 'Hipoteka', 'Inwestycje'],
        locations: ['Cała Holandia']
      },
      {
        name: 'Rabobank',
        description: 'Bank kooperacyjny z tradycjami',
        website: 'rabobank.nl',
        phone: '088-7226700',
        rating: 4.0,
        services: ['Konto prywatne', 'Biznesowe', 'Rolnicze'],
        locations: ['Cała Holandia']
      }
    ]
  };

  const filteredServices = () => {
    if (!selectedCategory) return [];
    
    let results = services[selectedCategory as keyof typeof services] || [];
    
    if (searchQuery) {
      results = results.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedRegion && selectedRegion !== "all") {
      results = results.filter(service =>
        service.locations.includes(selectedRegion) || 
        service.locations.includes('Cała Holandia') ||
        service.locations.includes('Online')
      );
    }
    
    return results;
  };

  const handleSearch = () => {
    if (!selectedCategory) {
      toast({
        title: "Wybierz kategorię",
        description: "Najpierw wybierz kategorię usług",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Wyszukiwanie...",
      description: `Znaleziono ${filteredServices().length} wyników`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{t("firstStepsTitle")}</h2>
            <p className="text-blue-100">
              {t("firstStepsDescription")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-blue-600" />
            <span>{t("serviceSearchTitle")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("category")}</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCategoryGeneral")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t("region")}</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder={t("allRegions")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allRegions")}</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t("searchLabel")}</label>
              <div className="flex space-x-2">
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">{t("categories")}</TabsTrigger>
          <TabsTrigger value="results">{t("searchResults")}</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {services[category.id as keyof typeof services]?.length || 0} {t("services")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="space-y-4">
            {filteredServices().length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">
                    {selectedCategory ? t("noResults") : t("selectCategoryToSee")}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredServices().map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-blue-600">{service.name}</h3>
                        <p className="text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{service.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          <Globe className="w-3 h-3 mr-1" />
                          {service.website}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          <Phone className="w-3 h-3 inline mr-1" />
                          {service.phone}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Usługi:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.services.map((srv, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {srv}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Lokalizacje:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.locations.map((location, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <MapPin className="w-3 h-3 mr-1" />
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>{t("usefulTips")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🏠 Mieszkanie</h4>
              <p className="text-sm text-blue-800">
                Zarejestruj się w GBA (adres zameldowania) w ciągu 5 dni od przeprowadzki
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">🏥 Ubezpieczenie</h4>
              <p className="text-sm text-green-800">
                Musisz mieć ubezpieczenie zdrowotne w ciągu 4 miesięcy od przybycia
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">🏦 Bank</h4>
              <p className="text-sm text-purple-800">
                Potrzebujesz BSN (numer ubezpieczenia społecznego) do założenia konta
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">💼 Praca</h4>
              <p className="text-sm text-orange-800">
                Sprawdź czy potrzebujesz pozwolenia na pracę (tewerkstellingsvergunning)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirstStepsHolland;
