import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const revenueData = [
  { month: 'Янв', revenue: 580000, paid: 550000 },
  { month: 'Фев', revenue: 620000, paid: 610000 },
  { month: 'Мар', revenue: 590000, paid: 580000 },
  { month: 'Апр', revenue: 650000, paid: 640000 },
  { month: 'Май', revenue: 680000, paid: 670000 },
  { month: 'Июн', revenue: 720000, paid: 680000 },
];

const propertyTypesData = [
  { name: 'Офисы', value: 45, color: '#0EA5E9' },
  { name: 'Склады', value: 30, color: '#8B5CF6' },
  { name: 'Торговые', value: 25, color: '#F97316' },
];

const properties = [
  { id: 1, name: 'БЦ "Северная Башня"', address: 'ул. Ленина, 45', area: 2500, tenants: 8, occupancy: 95, revenue: 850000, status: 'active' },
  { id: 2, name: 'Складской комплекс "Логистик"', address: 'Промзона 3, стр. 12', area: 5000, tenants: 3, occupancy: 100, revenue: 450000, status: 'active' },
  { id: 3, name: 'ТЦ "Центральный"', address: 'пр. Мира, 78', area: 3200, tenants: 12, occupancy: 87, revenue: 960000, status: 'active' },
  { id: 4, name: 'Офисный центр "Парус"', address: 'наб. Реки, 5', area: 1800, tenants: 5, occupancy: 72, revenue: 380000, status: 'maintenance' },
];

const tenants = [
  { id: 1, name: 'ООО "ТехноПром"', property: 'БЦ "Северная Башня"', area: 450, rent: 180000, contract: '15.03.2025', status: 'active', payment: 'ok' },
  { id: 2, name: 'ИП Смирнов А.В.', property: 'ТЦ "Центральный"', area: 120, rent: 95000, contract: '01.05.2025', status: 'active', payment: 'overdue' },
  { id: 3, name: 'АО "МегаЛогистика"', property: 'Складской комплекс', area: 5000, rent: 450000, contract: '20.06.2026', status: 'active', payment: 'ok' },
  { id: 4, name: 'ООО "Рога и Копыта"', property: 'БЦ "Северная Башня"', area: 280, rent: 125000, contract: '10.02.2024', status: 'expiring', payment: 'ok' },
];

const documents = [
  { id: 1, type: 'contract', name: 'Договор аренды №АР-2024-089', tenant: 'ООО "ТехноПром"', date: '15.11.2024', status: 'signed' },
  { id: 2, type: 'invoice', name: 'Счет №127 от 01.11.2024', tenant: 'ИП Смирнов А.В.', date: '01.11.2024', status: 'overdue' },
  { id: 3, type: 'act', name: 'Акт выполненных работ №45', tenant: 'АО "МегаЛогистика"', date: '28.10.2024', status: 'signed' },
  { id: 4, type: 'invoice', name: 'Счет-фактура №203', tenant: 'ООО "Рога и Копыта"', date: '05.11.2024', status: 'paid' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Общая площадь', value: '12,500 м²', change: '+8%', icon: 'Building2', color: 'text-blue-500' },
    { title: 'Доход за месяц', value: '2,845,000 ₽', change: '+12%', icon: 'TrendingUp', color: 'text-green-500' },
    { title: 'Активных арендаторов', value: '28', change: '+3', icon: 'Users', color: 'text-purple-500' },
    { title: 'Заполняемость', value: '88.5%', change: '+2.3%', icon: 'PieChart', color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Icon name="Building" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PropertyHub</h1>
              <p className="text-xs text-muted-foreground">Управление недвижимостью</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('dashboard')}>
              <Icon name="LayoutDashboard" className="mr-2 h-4 w-4" />
              Дашборд
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('properties')}>
              <Icon name="Building2" className="mr-2 h-4 w-4" />
              Объекты
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('tenants')}>
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Арендаторы
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('documents')}>
              <Icon name="FileText" className="mr-2 h-4 w-4" />
              Документы
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Icon name="Bell" className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="Settings" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon name={stat.icon as any} className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold font-data">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-600 font-medium">{stat.change}</span> за последний месяц
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Динамика доходов</CardTitle>
                  <CardDescription>Начисленная и полученная арендная плата</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#0EA5E9" name="Начислено" strokeWidth={2} />
                      <Line type="monotone" dataKey="paid" stroke="#8B5CF6" name="Получено" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Типы объектов</CardTitle>
                  <CardDescription>Распределение по категориям</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={propertyTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {propertyTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние события</CardTitle>
                <CardDescription>Актуальная информация по объектам и арендаторам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: 'AlertCircle', text: 'Просроченный платеж от ИП Смирнов А.В. на сумму 95,000 ₽', time: '2 часа назад', type: 'warning' },
                    { icon: 'FileCheck', text: 'Подписан договор аренды с ООО "НовоСтрой"', time: '5 часов назад', type: 'success' },
                    { icon: 'Calendar', text: 'Через 2 недели истекает договор с ООО "Рога и Копыта"', time: '1 день назад', type: 'info' },
                    { icon: 'Wrench', text: 'Офисный центр "Парус" закрыт на плановое обслуживание', time: '2 дня назад', type: 'neutral' },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        event.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        event.type === 'success' ? 'bg-green-100 text-green-600' :
                        event.type === 'info' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon name={event.icon as any} className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Объекты недвижимости</h2>
                <p className="text-muted-foreground">Управление коммерческой недвижимостью</p>
              </div>
              <Button>
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Добавить объект
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {properties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{property.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Icon name="MapPin" className="h-3 w-3" />
                          {property.address}
                        </CardDescription>
                      </div>
                      <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                        {property.status === 'active' ? 'Активен' : 'Обслуживание'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Площадь</p>
                        <p className="text-lg font-semibold font-data">{property.area} м²</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Арендаторов</p>
                        <p className="text-lg font-semibold font-data">{property.tenants}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Заполняемость</p>
                        <p className="text-lg font-semibold font-data">{property.occupancy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Доход/мес</p>
                        <p className="text-lg font-semibold font-data text-green-600">
                          {property.revenue.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Icon name="Eye" className="mr-2 h-4 w-4" />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tenants' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Арендаторы</h2>
                <p className="text-muted-foreground">Список активных арендаторов</p>
              </div>
              <Button>
                <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                Добавить арендатора
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Арендатор</th>
                        <th className="text-left p-4 font-medium">Объект</th>
                        <th className="text-right p-4 font-medium">Площадь</th>
                        <th className="text-right p-4 font-medium">Арендная плата</th>
                        <th className="text-left p-4 font-medium">Договор до</th>
                        <th className="text-center p-4 font-medium">Статус</th>
                        <th className="text-center p-4 font-medium">Оплата</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {tenants.map((tenant) => (
                        <tr key={tenant.id} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4 font-medium">{tenant.name}</td>
                          <td className="p-4 text-sm text-muted-foreground">{tenant.property}</td>
                          <td className="p-4 text-right font-data">{tenant.area} м²</td>
                          <td className="p-4 text-right font-data font-semibold">
                            {tenant.rent.toLocaleString()} ₽
                          </td>
                          <td className="p-4 text-sm">{tenant.contract}</td>
                          <td className="p-4 text-center">
                            <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'}>
                              {tenant.status === 'active' ? 'Активен' : 'Истекает'}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            {tenant.payment === 'ok' ? (
                              <Icon name="CheckCircle2" className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Icon name="AlertCircle" className="h-5 w-5 text-yellow-500 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Документы</h2>
                <p className="text-muted-foreground">Договоры, счета и акты</p>
              </div>
              <Button>
                <Icon name="FilePlus" className="mr-2 h-4 w-4" />
                Создать документ
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Все документы</TabsTrigger>
                <TabsTrigger value="contracts">Договоры</TabsTrigger>
                <TabsTrigger value="invoices">Счета</TabsTrigger>
                <TabsTrigger value="acts">Акты</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-6">
                {documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          doc.type === 'contract' ? 'bg-blue-100 text-blue-600' :
                          doc.type === 'invoice' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          <Icon name={
                            doc.type === 'contract' ? 'FileText' :
                            doc.type === 'invoice' ? 'Receipt' :
                            'FileCheck'
                          } className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.tenant} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          doc.status === 'signed' ? 'default' :
                          doc.status === 'paid' ? 'default' :
                          'destructive'
                        }>
                          {doc.status === 'signed' ? 'Подписан' :
                           doc.status === 'paid' ? 'Оплачен' :
                           'Просрочен'}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Icon name="Download" className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="Eye" className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
