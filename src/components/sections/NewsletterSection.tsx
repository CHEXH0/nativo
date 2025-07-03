import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Tag } from "lucide-react";

export const NewsletterSection = () => {
  const { t } = useLanguage();

  const newsItems = [
    {
      title: t('newsletter.item1.title'),
      description: t('newsletter.item1.description'),
      date: t('newsletter.item1.date'),
      category: t('newsletter.item1.category')
    },
    {
      title: t('newsletter.item2.title'),
      description: t('newsletter.item2.description'),
      date: t('newsletter.item2.date'),
      category: t('newsletter.item2.category')
    },
    {
      title: t('newsletter.item3.title'),
      description: t('newsletter.item3.description'),
      date: t('newsletter.item3.date'),
      category: t('newsletter.item3.category')
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-nativo-sage/10 via-nativo-cream/50 to-nativo-beige/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nativo-green mb-4 animate-fadeIn">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg text-nativo-charcoal/80 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            {t('newsletter.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <Card 
              key={index}
              className="bg-gradient-to-br from-nativo-cream to-nativo-beige/80 border-2 border-nativo-gold/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="secondary" 
                    className="bg-nativo-sage/20 text-nativo-green border-nativo-gold/30"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {item.category}
                  </Badge>
                  <div className="flex items-center text-sm text-nativo-charcoal/60">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.date}
                  </div>
                </div>
                <CardTitle className="text-xl text-nativo-green line-clamp-2">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-nativo-charcoal/80 line-clamp-3 leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};