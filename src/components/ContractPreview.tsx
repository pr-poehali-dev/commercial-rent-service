import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ContractData {
  contractNumber: string;
  tenantName: string;
  propertyName: string;
  propertyAddress: string;
  area: string;
  monthlyRent: string;
  deposit: string;
  startDate: string;
  endDate: string;
  paymentDay: string;
  landlordName: string;
  landlordINN: string;
  landlordAddress: string;
  specialConditions: string;
  generatedDate: string;
}

interface ContractPreviewProps {
  contract: ContractData;
  onDownload: () => void;
}

export default function ContractPreview({ contract, onDownload }: ContractPreviewProps) {
  const formatCurrency = (value: string) => {
    return Number(value).toLocaleString('ru-RU') + ' ₽';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Предварительный просмотр договора</h3>
        <Button onClick={onDownload}>
          <Icon name="Download" className="mr-2 h-4 w-4" />
          Скачать PDF
        </Button>
      </div>

      <Card className="bg-white">
        <CardContent className="p-8 space-y-6 font-data">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold uppercase">Договор аренды нежилого помещения</h1>
            <p className="text-lg">№ {contract.contractNumber}</p>
            <p className="text-muted-foreground">г. Москва, {contract.generatedDate}</p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-justify">
              <span className="font-semibold">{contract.landlordName}</span>, ИНН {contract.landlordINN}, 
              именуемое в дальнейшем <span className="font-semibold">"Арендодатель"</span>, в лице Генерального директора, 
              действующего на основании Устава, с одной стороны, и
            </p>

            <p className="text-justify">
              <span className="font-semibold">{contract.tenantName}</span>, 
              именуемое в дальнейшем <span className="font-semibold">"Арендатор"</span>, 
              с другой стороны, совместно именуемые <span className="font-semibold">"Стороны"</span>, 
              заключили настоящий Договор о нижеследующем:
            </p>

            <div className="space-y-3">
              <h2 className="text-lg font-bold mt-6">1. ПРЕДМЕТ ДОГОВОРА</h2>
              
              <p className="text-justify">
                1.1. Арендодатель обязуется предоставить Арендатору за плату во временное владение и пользование 
                нежилое помещение, именуемое в дальнейшем <span className="font-semibold">"Помещение"</span>:
              </p>

              <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                <p><span className="font-semibold">Объект:</span> {contract.propertyName}</p>
                <p><span className="font-semibold">Адрес:</span> {contract.propertyAddress}</p>
                <p><span className="font-semibold">Площадь:</span> {contract.area} м²</p>
              </div>

              <p className="text-justify">
                1.2. Помещение передается Арендатору для использования под офисные и коммерческие цели.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold mt-6">2. СРОК ДЕЙСТВИЯ ДОГОВОРА</h2>
              
              <p className="text-justify">
                2.1. Настоящий Договор вступает в силу с <span className="font-semibold">{formatDate(contract.startDate)}</span> и 
                действует до <span className="font-semibold">{formatDate(contract.endDate)}</span>.
              </p>

              <p className="text-justify">
                2.2. По истечении срока действия Договор может быть продлён по соглашению Сторон.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold mt-6">3. РАЗМЕР И ПОРЯДОК ОПЛАТЫ</h2>
              
              <p className="text-justify">
                3.1. Размер арендной платы за Помещение составляет <span className="font-semibold">{formatCurrency(contract.monthlyRent)}</span> в месяц, 
                включая НДС.
              </p>

              <p className="text-justify">
                3.2. Арендная плата вносится Арендатором ежемесячно не позднее <span className="font-semibold">{contract.paymentDay} числа</span> текущего месяца 
                путём безналичного перечисления на расчётный счёт Арендодателя.
              </p>

              {contract.deposit && (
                <p className="text-justify">
                  3.3. Обеспечительный платёж в размере <span className="font-semibold">{formatCurrency(contract.deposit)}</span> вносится 
                  Арендатором в течение 5 (пяти) рабочих дней с момента подписания настоящего Договора.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold mt-6">4. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
              
              <p className="text-justify">
                4.1. Арендодатель обязуется:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>Передать Арендатору Помещение в состоянии, пригодном для использования</li>
                <li>Обеспечивать надлежащее содержание общего имущества здания</li>
                <li>Не препятствовать Арендатору в пользовании Помещением</li>
              </ul>

              <p className="text-justify mt-3">
                4.2. Арендатор обязуется:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>Своевременно вносить арендную плату</li>
                <li>Поддерживать Помещение в исправном состоянии</li>
                <li>Не передавать права по Договору третьим лицам без согласия Арендодателя</li>
              </ul>
            </div>

            {contract.specialConditions && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold mt-6">5. ОСОБЫЕ УСЛОВИЯ</h2>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-justify whitespace-pre-wrap">{contract.specialConditions}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h2 className="text-lg font-bold mt-6">6. ОТВЕТСТВЕННОСТЬ СТОРОН</h2>
              
              <p className="text-justify">
                6.1. За нарушение сроков внесения арендной платы Арендатор уплачивает Арендодателю пени в размере 
                0,1% от суммы просроченного платежа за каждый день просрочки.
              </p>

              <p className="text-justify">
                6.2. Стороны освобождаются от ответственности за неисполнение обязательств по настоящему Договору, 
                если оно явилось следствием обстоятельств непреодолимой силы.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold mt-6">7. ПРОЧИЕ УСЛОВИЯ</h2>
              
              <p className="text-justify">
                7.1. Все изменения и дополнения к настоящему Договору действительны при условии, 
                что они совершены в письменной форме и подписаны обеими Сторонами.
              </p>

              <p className="text-justify">
                7.2. Договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, 
                по одному для каждой из Сторон.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold">АРЕНДОДАТЕЛЬ:</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">{contract.landlordName}</p>
                  <p>ИНН: {contract.landlordINN}</p>
                  <p>{contract.landlordAddress}</p>
                </div>
                <div className="mt-8 border-b border-gray-400 pb-1">
                  <p className="text-xs text-muted-foreground">Подпись / М.П.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">АРЕНДАТОР:</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">{contract.tenantName}</p>
                  <p className="text-muted-foreground">Реквизиты уточняются</p>
                </div>
                <div className="mt-8 border-b border-gray-400 pb-1">
                  <p className="text-xs text-muted-foreground">Подпись / М.П.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
