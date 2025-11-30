import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: number;
  name: string;
  address: string;
  area: number;
}

interface Tenant {
  id: number;
  name: string;
}

interface ContractGeneratorProps {
  properties: Property[];
  tenants: Tenant[];
  onGenerate: (contract: any) => void;
}

export default function ContractGenerator({ properties, tenants, onGenerate }: ContractGeneratorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    contractNumber: `АР-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    tenantId: '',
    propertyId: '',
    area: '',
    monthlyRent: '',
    deposit: '',
    startDate: '',
    endDate: '',
    paymentDay: '5',
    landlordName: 'ООО "PropertyHub"',
    landlordINN: '7707123456',
    landlordAddress: 'г. Москва, ул. Арбат, д. 1',
    specialConditions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedTenant = tenants.find(t => t.id === Number(formData.tenantId));
    const selectedProperty = properties.find(p => p.id === Number(formData.propertyId));

    if (!selectedTenant || !selectedProperty) {
      toast({ title: 'Ошибка', description: 'Выберите арендатора и объект', variant: 'destructive' });
      return;
    }

    const contract = {
      ...formData,
      tenantName: selectedTenant.name,
      propertyName: selectedProperty.name,
      propertyAddress: selectedProperty.address,
      generatedDate: new Date().toLocaleDateString('ru-RU')
    };

    onGenerate(contract);
    toast({ title: 'Успешно', description: 'Договор сформирован и готов к экспорту' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" className="h-5 w-5 text-primary" />
            Основные данные договора
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractNumber">Номер договора</Label>
              <Input 
                id="contractNumber" 
                value={formData.contractNumber}
                onChange={(e) => handleChange('contractNumber', e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenant">Арендатор *</Label>
              <Select value={formData.tenantId} onValueChange={(value) => handleChange('tenantId', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите арендатора" />
                </SelectTrigger>
                <SelectContent>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id.toString()}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property">Объект недвижимости *</Label>
            <Select value={formData.propertyId} onValueChange={(value) => handleChange('propertyId', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите объект" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id.toString()}>
                    {property.name} - {property.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="DollarSign" className="h-5 w-5 text-green-500" />
            Финансовые условия
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Площадь (м²) *</Label>
              <Input 
                id="area" 
                type="number" 
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                placeholder="450" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyRent">Арендная плата (₽/мес) *</Label>
              <Input 
                id="monthlyRent" 
                type="number" 
                value={formData.monthlyRent}
                onChange={(e) => handleChange('monthlyRent', e.target.value)}
                placeholder="180000" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Обеспечительный платеж (₽)</Label>
              <Input 
                id="deposit" 
                type="number" 
                value={formData.deposit}
                onChange={(e) => handleChange('deposit', e.target.value)}
                placeholder="180000" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDay">День оплаты (число месяца)</Label>
            <Input 
              id="paymentDay" 
              type="number" 
              min="1" 
              max="28"
              value={formData.paymentDay}
              onChange={(e) => handleChange('paymentDay', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calendar" className="h-5 w-5 text-blue-500" />
            Срок действия договора
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Дата начала *</Label>
              <Input 
                id="startDate" 
                type="date" 
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Дата окончания *</Label>
              <Input 
                id="endDate" 
                type="date" 
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Building" className="h-5 w-5 text-purple-500" />
            Данные арендодателя
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="landlordName">Наименование арендодателя *</Label>
            <Input 
              id="landlordName" 
              value={formData.landlordName}
              onChange={(e) => handleChange('landlordName', e.target.value)}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="landlordINN">ИНН арендодателя *</Label>
              <Input 
                id="landlordINN" 
                value={formData.landlordINN}
                onChange={(e) => handleChange('landlordINN', e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordAddress">Адрес арендодателя *</Label>
              <Input 
                id="landlordAddress" 
                value={formData.landlordAddress}
                onChange={(e) => handleChange('landlordAddress', e.target.value)}
                required 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileEdit" className="h-5 w-5 text-orange-500" />
            Особые условия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Дополнительные условия, ограничения, особенности использования помещения..."
            value={formData.specialConditions}
            onChange={(e) => handleChange('specialConditions', e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" size="lg" className="flex-1">
          <Icon name="FileCheck" className="mr-2 h-5 w-5" />
          Сформировать договор
        </Button>
        <Button type="button" variant="outline" size="lg">
          <Icon name="Download" className="mr-2 h-5 w-5" />
          Экспорт в PDF
        </Button>
      </div>
    </form>
  );
}
