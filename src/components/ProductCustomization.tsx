import { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Product, Size, SelectedCustomization, CustomizationOption } from '@/types';

interface ProductCustomizationProps {
  product: Product;
  onAddToCart: (item: any) => void;
}

export const ProductCustomization = ({ product, onAddToCart }: ProductCustomizationProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product.sizes?.[0] || null
  );
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  
  const calculatePrice = () => {
    let basePrice = product.price;
    let sizePrice = selectedSize?.price || 0;
    let customizationPrice = selectedCustomizations.reduce((total, customization) => {
      return total + customization.selectedOptions.reduce((sum, option) => sum + option.price, 0);
    }, 0);
    
    return (basePrice + sizePrice + customizationPrice) * quantity;
  };

  const handleCustomizationChange = (customizationId: string, customizationName: string, option: CustomizationOption, checked: boolean) => {
    setSelectedCustomizations(prev => {
      const existingIndex = prev.findIndex(c => c.customizationId === customizationId);
      
      if (existingIndex === -1) {
        // New customization
        if (checked) {
          return [...prev, {
            customizationId,
            customizationName,
            selectedOptions: [option]
          }];
        }
        return prev;
      }
      
      // Existing customization
      const existing = prev[existingIndex];
      const optionIndex = existing.selectedOptions.findIndex(o => o.id === option.id);
      
      let newSelectedOptions;
      if (checked && optionIndex === -1) {
        newSelectedOptions = [...existing.selectedOptions, option];
      } else if (!checked && optionIndex !== -1) {
        newSelectedOptions = existing.selectedOptions.filter(o => o.id !== option.id);
      } else {
        return prev;
      }
      
      if (newSelectedOptions.length === 0) {
        return prev.filter((_, index) => index !== existingIndex);
      }
      
      const updated = [...prev];
      updated[existingIndex] = {
        ...existing,
        selectedOptions: newSelectedOptions
      };
      
      return updated;
    });
  };

  const handleSingleOptionChange = (customizationId: string, customizationName: string, option: CustomizationOption) => {
    setSelectedCustomizations(prev => {
      const filtered = prev.filter(c => c.customizationId !== customizationId);
      return [...filtered, {
        customizationId,
        customizationName,
        selectedOptions: [option]
      }];
    });
  };

  const handleAddToCart = () => {
    const item = {
      productId: product.id,
      product,
      quantity,
      selectedSize,
      selectedCustomizations,
      totalPrice: calculatePrice(),
    };
    onAddToCart(item);
  };

  const isOptionSelected = (customizationId: string, optionId: string) => {
    const customization = selectedCustomizations.find(c => c.customizationId === customizationId);
    return customization?.selectedOptions.some(o => o.id === optionId) || false;
  };

  return (
    <div className="space-y-6">
      {/* Product Info */}
      <div className="flex gap-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.description}</p>
          <div className="mt-2 text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>

      <Separator />

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">Size</h4>
          <RadioGroup
            value={selectedSize?.name || ''}
            onValueChange={(value) => {
              const size = product.sizes?.find(s => s.name === value) || null;
              setSelectedSize(size);
            }}
          >
            {product.sizes.map((size) => (
              <div key={size.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={size.name} id={`size-${size.name}`} />
                  <Label htmlFor={`size-${size.name}`} className="font-medium">
                    {size.name}
                  </Label>
                </div>
                {size.price > 0 && (
                  <Badge variant="outline">+${size.price.toFixed(2)}</Badge>
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Customizations */}
      {product.customizations?.map((customization) => (
        <div key={customization.id} className="space-y-3">
          <Separator />
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{customization.name}</h4>
            {customization.required && (
              <Badge variant="destructive" className="text-xs">Required</Badge>
            )}
          </div>
          
          <div className="space-y-2">
            {customization.maxSelections === 1 ? (
              // Radio group for single selection
              <RadioGroup
                value={selectedCustomizations.find(c => c.customizationId === customization.id)?.selectedOptions[0]?.id || ''}
                onValueChange={(value) => {
                  const option = customization.options.find(o => o.id === value);
                  if (option) {
                    handleSingleOptionChange(customization.id, customization.name, option);
                  }
                }}
              >
                {customization.options.map((option) => (
                  <div key={option.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`${customization.id}-${option.id}`} />
                      <Label htmlFor={`${customization.id}-${option.id}`}>
                        {option.name}
                      </Label>
                    </div>
                    {option.price > 0 && (
                      <Badge variant="outline">+${option.price.toFixed(2)}</Badge>
                    )}
                  </div>
                ))}
              </RadioGroup>
            ) : (
              // Checkboxes for multiple selections
              customization.options.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${customization.id}-${option.id}`}
                      checked={isOptionSelected(customization.id, option.id)}
                      onCheckedChange={(checked) => {
                        handleCustomizationChange(customization.id, customization.name, option, !!checked);
                      }}
                    />
                    <Label htmlFor={`${customization.id}-${option.id}`}>
                      {option.name}
                    </Label>
                  </div>
                  {option.price > 0 && (
                    <Badge variant="outline">+${option.price.toFixed(2)}</Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      <Separator />

      {/* Quantity Selection */}
      <div className="space-y-3">
        <h4 className="font-semibold">Quantity</h4>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Add to Cart */}
      <div className="sticky bottom-0 bg-background pt-4">
        <Button 
          onClick={handleAddToCart} 
          className="w-full" 
          size="lg"
          variant="hero"
        >
          Add to Cart - ${calculatePrice().toFixed(2)}
        </Button>
      </div>
    </div>
  );
};
