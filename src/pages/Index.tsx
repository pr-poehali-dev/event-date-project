import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface HistoricalEvent {
  id: number;
  date: string;
  year: number;
  title: string;
  description: string;
  category: string;
  era: string;
}

const historicalEvents: HistoricalEvent[] = [
  {
    id: 1,
    date: '9 мая',
    year: 1945,
    title: 'День Победы',
    description: 'Окончание Великой Отечественной войны. Подписание акта о безоговорочной капитуляции нацистской Германии.',
    category: 'Военная история',
    era: 'XX век'
  },
  {
    id: 2,
    date: '12 апреля',
    year: 1961,
    title: 'Полёт Юрия Гагарина',
    description: 'Первый полёт человека в космос. Юрий Гагарин совершил орбитальный полёт вокруг Земли на корабле "Восток-1".',
    category: 'Космонавтика',
    era: 'XX век'
  },
  {
    id: 3,
    date: '7 ноября',
    year: 1917,
    title: 'Октябрьская революция',
    description: 'Вооружённое восстание в Петрограде. Свержение Временного правительства и приход к власти большевиков.',
    category: 'Политика',
    era: 'XX век'
  },
  {
    id: 4,
    date: '21 сентября',
    year: 1380,
    title: 'Куликовская битва',
    description: 'Сражение между объединённым русским войском и войском Золотой Орды. Важная веха в освобождении Руси от монгольского ига.',
    category: 'Военная история',
    era: 'Средневековье'
  },
  {
    id: 5,
    date: '26 августа',
    year: 1812,
    title: 'Бородинское сражение',
    description: 'Крупнейшее сражение Отечественной войны 1812 года между русской и французской армиями.',
    category: 'Военная история',
    era: 'XIX век'
  },
  {
    id: 6,
    date: '22 января',
    year: 1905,
    title: 'Кровавое воскресенье',
    description: 'Расстрел мирного шествия рабочих к Зимнему дворцу в Санкт-Петербурге. Начало первой русской революции.',
    category: 'Политика',
    era: 'XX век'
  },
  {
    id: 7,
    date: '14 декабря',
    year: 1825,
    title: 'Восстание декабристов',
    description: 'Вооружённое выступление русских революционеров на Сенатской площади в Санкт-Петербурге.',
    category: 'Политика',
    era: 'XIX век'
  },
  {
    id: 8,
    date: '2 марта',
    year: 1861,
    title: 'Отмена крепостного права',
    description: 'Император Александр II подписал Манифест об отмене крепостного права, освободив миллионы крестьян.',
    category: 'Социальные реформы',
    era: 'XIX век'
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<HistoricalEvent[]>(historicalEvents);

  const handleSearch = () => {
    let results = historicalEvents;
    
    if (searchQuery) {
      results = results.filter(event => 
        event.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedYear) {
      results = results.filter(event => 
        event.year.toString() === selectedYear
      );
    }
    
    setFilteredEvents(results.sort((a, b) => a.year - b.year));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Военная история': 'bg-primary text-primary-foreground',
      'Космонавтика': 'bg-secondary text-secondary-foreground',
      'Политика': 'bg-accent text-accent-foreground',
      'Социальные реформы': 'bg-purple-500 text-white'
    };
    return colors[category] || 'bg-gray-500 text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            История России
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Откройте для себя ключевые события истории нашей страны
          </p>
        </div>

        <Card className="mb-12 shadow-2xl animate-scale-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Calendar" className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <Input
                  placeholder="Введите дату (например: 9 мая) или событие"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="md:w-48 relative">
                <Icon name="Hash" className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <Input
                  type="number"
                  placeholder="Год"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                className="h-12 px-8 text-lg font-semibold"
                size="lg"
              >
                <Icon name="Search" className="mr-2" size={20} />
                Найти
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Icon name="Clock" className="text-primary" size={32} />
            Временная линия
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full hidden md:block"></div>
          
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="md:ml-20 group">
                  <div className="absolute -left-4 md:left-[-4.5rem] top-8 w-12 h-12 bg-white rounded-full border-4 border-primary shadow-lg flex items-center justify-center font-bold text-primary hidden md:flex">
                    <Icon name="Star" size={20} />
                  </div>
                  
                  <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Icon name="Calendar" size={18} />
                            <span className="text-lg">{event.date} {event.year}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          <Badge variant="outline" className="text-sm">
                            {event.era}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-2xl font-bold mb-2">События не найдены</h3>
            <p className="text-muted-foreground text-lg">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
