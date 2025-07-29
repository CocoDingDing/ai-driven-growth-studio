import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  number: number;
}

const ProductCard = ({ title, description, number }: ProductCardProps) => {
  return (
    <Card className="bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground">
            {number}
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/60"
          onClick={() => window.open('https://advice.typeform.com/to/DT7U0IZd', '_blank')}
        >
          En savoir plus
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;