import React from "react";
import { TimePeriodsBlock } from "./Components/TimePeriodsBlock/TimePeriodsBlock";
import { TimePeriod } from "./Components/TimePeriodsBlock/types";

const periodsData: TimePeriod[] = [
  {
    id: "1",
    label: "Литература",
    from: 1992,
    to: 1997,
    events: [
      {
        year: 1994,
        description: "«Бессонница» — роман Стивена Кинга.",
      },
      {
        year: 1995,
        description: "Нобелевская премия по литературе — Шеймас Хини",
      },
      {
        year: 1992,
        description: "Нобелевская премия по литературе — Дерек Уолкотт",
      },
      {
        year: 1993,
        description: "Тони Моррисон получает Нобелевскую премию по литературе",
      },
      {
        year: 1996,
        description: "Выходит роман 'Сто лет одиночества' в новом переводе",
      },
      {
        year: 1997,
        description: "Харуки Мураками публикует 'Хроники заводной птицы'",
      },
    ],
  },
  {
    id: "2",
    label: "Кино",
    from: 1998,
    to: 2003,
    events: [
      {
        year: 1998,
        description: "«Титаник» получает 11 премий Оскар",
      },
      {
        year: 1999,
        description: "Выходит фильм «Матрица»",
      },
      {
        year: 2000,
        description: "«Гладиатор» получает Оскар за лучший фильм",
      },
    ],
  },
  {
    id: "3",
    label: "Наука",
    from: 2004,
    to: 2009,
    events: [
      {
        year: 2004,
        description: "Открытие графена",
      },
      {
        year: 2005,
        description: "Первая успешная посадка на Титане",
      },
      {
        year: 2006,
        description: "Плутон переклассифицирован в карликовую планету",
      },
    ],
  },
  {
    id: "4",
    label: "Технологии",
    from: 2010,
    to: 2015,
    events: [
      {
        year: 2010,
        description: "Выход первого iPad",
      },
      {
        year: 2012,
        description: "Обнаружение бозона Хиггса",
      },
      {
        year: 2014,
        description: "Революция в мобильных платежах",
      },
    ],
  },
  {
    id: "5",
    label: "Искусство",
    from: 2016,
    to: 2021,
    events: [
      {
        year: 2017,
        description: "NFT становятся популярными в цифровом искусстве",
      },
      {
        year: 2019,
        description: "Открытие Лувра в Абу-Даби",
      },
      {
        year: 2021,
        description: "Виртуальные выставки становятся нормой",
      },
    ],
  },
  {
    id: "6",
    label: "Музыка",
    from: 2022,
    to: 2027,
    events: [
      {
        year: 2023,
        description: "Искусственный интеллект в создании музыки",
      },
      {
        year: 2025,
        description: "Возрождение виниловых пластинок",
      },
      {
        year: 2026,
        description: "Новые форматы иммерсивного звука",
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <TimePeriodsBlock periods={periodsData} />
      <TimePeriodsBlock periods={periodsData.slice(0, 2)} />
    </div>
  );
}

export default App;
