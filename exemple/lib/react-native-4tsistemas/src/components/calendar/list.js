export function ReturnList(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();


    const days = [];

    // Preencha os dias do mês anterior se o mês não começar em um domingo
    if (firstDay.getDay() > 0) {
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;
        const lastDayOfPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
        for (let i = firstDay.getDay(); i > 0; i--) {
            const day = (lastDayOfPrevMonth - ((i - 1))).toString().padStart(2, "0");
            days.push({
                day,
                month_number: prevMonth,
                month: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(prevYear, prevMonth - 1)),
                week: new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(new Date(prevYear, prevMonth - 1, lastDayOfPrevMonth - ((i - 1)))),
                weeksublime: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(new Date(prevYear, prevMonth - 1, lastDayOfPrevMonth - ((i - 1)))),
                year: prevYear,
                click: `${prevYear}-${prevMonth < 10 ? '0' + prevMonth : prevMonth}-${day}`
            });
        }
    }

    // Preencha os dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
        const day = i.toString().padStart(2, "0");
        days.push({
            day,
            month_number: month,
            month: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(year, month - 1, i)),
            week: new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(new Date(year, month - 1, i)),
            weeksublime: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(new Date(year, month - 1, i)),
            year: year,
            click: `${year}-${month < 10 ? '0' + month : month}-${day}`
        });
    }

    // Preencha os dias do próximo mês se o mês não terminar em um sábado
    if (lastDay.getDay() < 6) {
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;
        for (let i = lastDay.getDay(); i < 6; i++) {
            const day = (i - lastDay.getDay() + 1).toString().padStart(2, "0");
            days.push({
                day,
                month_number: nextMonth,
                month: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(nextYear, nextMonth - 1)),
                week: new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(new Date(nextYear, nextMonth - 1, i - lastDay.getDay() + 1)),
                weeksublime: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(new Date(nextYear, nextMonth - 1, i - lastDay.getDay() + 1)),
                year: nextYear,
                click: `${nextYear}-${nextMonth < 10 ? '0' + nextMonth : nextMonth}-${day}`
            });
        }
    }

    return days;
};

export function getMonthName(monthNumber) {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
  
    // Verifica se o número do mês está dentro do intervalo válido (1 a 12)
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return 'Mês inválido';
    }
  };


  export function getYearList() {
    const currentYear = new Date().getFullYear();
    const yearList = [];
  
    for (let i = 0; i < 10; i++) {
      yearList.push(currentYear - i);
    }
  
    return yearList;
  }