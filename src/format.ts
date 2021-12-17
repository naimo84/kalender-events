import { iCalEvent, IKalenderEvent, Config } from "./interfaces";
import { isAllDay } from "./helper";
import moment from "moment";

/* istanbul ignore next */
export function formatDate(event: iCalEvent | IKalenderEvent | undefined, _date: Date, _end: Date, withTime: boolean, config: Config): string {
    if (!config.replacedates && typeof Intl.DateTimeFormat === 'function') {
        const dateTime: Intl.DateTimeFormat = new Intl.DateTimeFormat(config.language, config.dateformat);
        //@ts-ignore
        return dateTime.formatRange(_date, _end);
    }

    var day: any = _date.getDate();
    var month: any = _date.getMonth() + 1;
    var year = _date.getFullYear();
    var endday = _end.getDate();
    var endmonth = _end.getMonth() + 1;
    var endyear = _end.getFullYear();
    var _time = '';
    var alreadyStarted = _date < new Date();

    const fullday = isAllDay(event, _date, _end);

    if (!config.replacedates && withTime) {
        let hours = _date.getHours().toString();
        let minutes = _date.getMinutes().toString();

        if (!alreadyStarted) {
            if (parseInt(hours) < 10) hours = '0' + hours.toString();
            if (parseInt(minutes) < 10) minutes = '0' + minutes.toString();
            _time = ' ' + hours + ':' + minutes;
        }
        let timeDiff = _end.getTime() - _date.getTime();
        if (timeDiff === 0 && parseInt(hours) === 0 && parseInt(minutes) === 0) {
            _time = ' ';
        } else if (timeDiff > 0) {
            if (!alreadyStarted) {
                _time += '-';
            } else {
                _time += ' ';
            }

            let endhours = _end.getHours().toString();
            let endminutes = _end.getMinutes().toString();

            if (parseInt(endhours) < 10) endhours = '0' + endhours.toString();

            if (parseInt(endminutes) < 10) endminutes = '0' + endminutes.toString();
            _time += endhours + ':' + endminutes;

            const startDayEnd = moment(_date).endOf('day').toDate();

            if (_end > startDayEnd) {
                var start = new Date();
                if (!alreadyStarted) {
                    start.setDate(_date.getDate());
                    start.setMonth(_date.getMonth());
                    start.setFullYear(_date.getFullYear());
                }
                start.setHours(0, 0, 1, 0);
                var fullTimeDiff = timeDiff;
                timeDiff = _end.getTime() - start.getTime();

                if (fullTimeDiff >= 24 * 60 * 60 * 1000) {
                    _time += '+' + Math.floor(timeDiff / (24 * 60 * 60 * 1000));
                }
            } else if (config.replacedates && _end.getHours() === 0 && _end.getMinutes() === 0) {
                _time = ' ';
            }
        }
    }
    var _class = '';
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    var d2 = new Date();
    d2.setDate(d.getDate() + 1);

    var todayOnly = false;
    if (
        day === d.getDate() &&
        month === d.getMonth() + 1 &&
        year === d.getFullYear() &&
        endday === d2.getDate() &&
        endmonth === d2.getMonth() + 1 &&
        endyear === d2.getFullYear() &&
        fullday
    ) {
        todayOnly = true;
    }

    if (todayOnly || !alreadyStarted) {
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = 'today';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = 'tomorrow';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = 'dayafter';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = '3days';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = '4days';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = '5days';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = '6days';
        }

        d.setDate(d.getDate() + 1);
        if (day === d.getDate() && month === d.getMonth() + 1 && year === d.getFullYear()) {
            _class = 'oneweek';
        }

        if (config.replacedates) {
            if (_class === 'today') return replaceText('today', config) + _time;
            if (_class === 'tomorrow') return replaceText('tomorrow', config) + _time;
            if (_class === 'dayafter') return replaceText('dayafter', config) + _time;
            if (_class === '3days') return replaceText('3days', config) + _time;
            if (_class === '4days') return replaceText('4days', config) + _time;
            if (_class === '5days') return replaceText('5days', config) + _time;
            if (_class === '6days') return replaceText('6days', config) + _time;
            if (_class === 'oneweek') return replaceText('oneweek', config) + _time;
        }
    } else {
        _class = 'today';
        var daysleft = Math.round((_end.getDate() - new Date().getDate()) / (1000 * 60 * 60 * 24));
        var hoursleft = Math.round((_end.getDate() - new Date().getDate()) / (1000 * 60 * 60));

        if (config.replacedates) {
            var _left = replaceText('left', config) !== ' ' ? ' ' + replaceText('left', config) : '';
            var text;
            if (daysleft === 42) {
                text = replaceText('6week_left', config);
            } else if (daysleft === 35) {
                text = replaceText('5week_left', config);
            } else if (daysleft === 28) {
                text = replaceText('4week_left', config);
            } else if (daysleft === 21) {
                text = replaceText('3week_left', config);
            } else if (daysleft === 14) {
                text = replaceText('2week_left', config);
            } else if (daysleft === 7) {
                text = replaceText('1week_left', config);
            } else if (daysleft >= 1) {
                if (config.language === 'ru') {
                    var c = daysleft % 10;
                    var cc = Math.floor(daysleft / 10) % 10;
                    if (daysleft === 1) {
                        text = (replaceText('still', config) !== ' ' ? replaceText('still', config) : '') + ' ' + daysleft + ' ' + replaceText('day', config) + _left;
                    } else if (cc > 1 && (c > 1 || c < 5)) {
                        text = (replaceText('still', config) !== ' ' ? replaceText('still', config) : '', config) + ' ' + daysleft + ' ' + 'дня' + _left;
                    } else {
                        text = (replaceText('still', config) !== ' ' ? replaceText('still', config) : '') + ' ' + daysleft + ' ' + replaceText('days', config) + _left;
                    }
                } else {
                    text =
                        (replaceText('still', config) !== ' ' ? replaceText('still', config) : '', config) +
                        ' ' +
                        daysleft +
                        ' ' +
                        (daysleft === 1 ? replaceText('day', config) : replaceText('days', config), config) +
                        _left;
                }
            } else {
                if (config.language === 'ru') {
                    var c = hoursleft % 10;
                    var cc = Math.floor(hoursleft / 10) % 10;
                    if (hoursleft === 1) {
                        text = (replaceText('still', config) !== ' ' ? replaceText('still', config) : '') + ' ' + hoursleft + ' ' + replaceText('hour', config) + _left;
                    } else if (cc !== 1 && (c > 1 || c < 5)) {
                        text = (replaceText('still', config) !== ' ' ? replaceText('still', config) : '', config) + ' ' + hoursleft + ' ' + 'часа' + _left;
                    } else {
                        text = (replaceText('still', config) !== ' ' ? replaceText('still', config) : '') + ' ' + hoursleft + ' ' + replaceText('hours', config) + _left;
                    }
                } else {
                    text =
                        (replaceText('still', config) !== ' ' ? replaceText('still', config) : '') +
                        ' ' +
                        hoursleft +
                        ' ' +
                        (hoursleft === 1 ? replaceText('hour', config) : replaceText('hours', config)) +
                        _left;
                }
            }
        } else {
            day = _end.getDate();
            if (fullday) {
                day -= 1;
                withTime = false;
            }
            month = _end.getMonth() + 1;
            year = _end.getFullYear();

            if (day < 10) day = '0' + day.toString();
            if (month < 10) month = '0' + month.toString();

            text = day + '.' + month + '.';
            text += year;

            if (withTime) {
                let endhours = _end.getHours().toString();
                let endminutes = _end.getMinutes().toString();

                if (parseInt(endhours) < 10) {
                    endhours = '0' + endhours.toString();
                }
                if (parseInt(endminutes) < 10) {
                    endminutes = '0' + endminutes.toString();
                }
                text += ' ' + endhours + ':' + endminutes;
            }
        }

        return text;
    }

    if (day < 10) day = '0' + day.toString();
    if (month < 10) month = '0' + month.toString();

    return (day + '.' + month + '.' + year + _time).trim()

}

/* istanbul ignore next */
function replaceText(text: string, config: any) {
    if (!text) return '';

    if (dictionary[text]) {
        var newText = dictionary[text][config.language as string];
        if (newText) {
            return newText;
        } else if (config.language !== 'en') {
            newText = dictionary[text].en;
            if (newText) {
                return newText;
            }
        }
    }
    return text;
}

const dictionary: any = {
    today: {
        en: 'Today',
        it: 'Oggi',
        es: 'Hoy',
        pl: 'Dzisiaj',
        fr: "Aujourd'hui",
        de: 'Heute',
        ru: 'Сегодня',
        nl: 'Vandaag',
    },
    tomorrow: {
        en: 'Tomorrow',
        it: 'Domani',
        es: 'Mañana',
        pl: 'Jutro',
        fr: 'Demain',
        de: 'Morgen',
        ru: 'Завтра',
        nl: 'Morgen',
    },
    dayafter: {
        en: 'Day After Tomorrow',
        it: 'Dopodomani',
        es: 'Pasado mañana',
        pl: 'Pojutrze',
        fr: 'Après demain',
        de: 'Übermorgen',
        ru: 'Послезавтра',
        nl: 'Overmorgen',
    },
    '3days': {
        en: 'In 3 days',
        it: 'In 3 giorni',
        es: 'En 3 días',
        pl: 'W 3 dni',
        fr: 'Dans 3 jours',
        de: 'In 3 Tagen',
        ru: 'Через 2 дня',
        nl: 'Over 3 dagen',
    },
    '4days': {
        en: 'In 4 days',
        it: 'In 4 giorni',
        es: 'En 4 días',
        pl: 'W 4 dni',
        fr: 'Dans 4 jours',
        de: 'In 4 Tagen',
        ru: 'Через 3 дня',
        nl: 'Over 4 dagen',
    },
    '5days': {
        en: 'In 5 days',
        it: 'In 5 giorni',
        es: 'En 5 días',
        pl: 'W ciągu 5 dni',
        fr: 'Dans 5 jours',
        de: 'In 5 Tagen',
        ru: 'Через 4 дня',
        nl: 'Over 5 dagen',
    },
    '6days': {
        en: 'In 6 days',
        it: 'In 6 giorni',
        es: 'En 6 días',
        pl: 'W ciągu 6 dni',
        fr: 'Dans 6 jours',
        de: 'In 6 Tagen',
        ru: 'Через 5 дней',
        nl: 'Over 6 dagen',
    },
    oneweek: {
        en: 'In one week',
        it: 'In una settimana',
        es: 'En una semana',
        pl: 'W jeden tydzień',
        fr: 'Dans une semaine',
        de: 'In einer Woche',
        ru: 'Через неделю',
        nl: 'Binnen een week',
    },
    '1week_left': {
        en: 'One week left',
        it: 'Manca una settimana',
        es: 'Queda una semana',
        pl: 'Został jeden tydzień',
        fr: 'Reste une semaine',
        de: 'Noch eine Woche',
        ru: 'Ещё неделя',
        nl: 'Over een week',
    },
    '2week_left': {
        en: 'Two weeks left',
        it: 'Due settimane rimaste',
        es: 'Dos semanas restantes',
        pl: 'Zostały dwa tygodnie',
        fr: 'Il reste deux semaines',
        de: 'Noch zwei Wochen',
        ru: 'Ещё две недели',
        nl: 'Over twee weken',
    },
    '3week_left': {
        en: 'Three weeks left',
        it: 'Tre settimane rimanenti',
        es: 'Tres semanas quedan',
        pl: 'Pozostały trzy tygodnie',
        fr: 'Trois semaines restantes',
        de: 'Noch drei Wochen',
        ru: 'Ещё три недели',
        nl: 'Over drie weken',
    },
    '4week_left': {
        en: 'Four weeks left',
        it: 'Quattro settimane rimaste',
        es: 'Cuatro semanas quedan',
        pl: 'Pozostały cztery tygodnie',
        fr: 'Quatre semaines à gauche',
        de: 'Noch vier Wochen',
        ru: 'Ещё три недели',
        nl: 'Over vier weken',
    },
    '5week_left': {
        en: 'Five weeks left',
        it: 'Cinque settimane rimaste',
        es: 'Quedan cinco semanas',
        pl: 'Pozostało pięć tygodni',
        fr: 'Cinq semaines à gauche',
        de: 'Noch fünf Wochen',
        ru: 'Ещё пять недель',
        nl: 'Over vijf weken',
    },
    '6week_left': {
        en: 'Six weeks left',
        it: 'Sei settimane a sinistra',
        es: 'Seis semanas restantes',
        pl: 'Pozostało sześć tygodni',
        fr: 'Six semaines à gauche',
        de: 'Noch sechs Wochen',
        ru: 'Ещё шесть недель',
        nl: 'Over zes weken',
    },
    left: {
        en: 'left',
        it: 'sinistra',
        es: 'izquierda',
        pl: 'lewo',
        fr: 'la gauche',
        de: ' ',
        ru: 'осталось',
        nl: 'over',
    },
    still: { en: '', it: '', es: '', pl: '', fr: '', de: 'Noch', ru: '', nl: 'nog' },
    days: { en: 'days', it: 'Giorni', es: 'dias', pl: 'dni', fr: 'journées', de: 'Tage', ru: 'дней', nl: 'dagen' },
    day: { en: 'day', it: 'giorno', es: 'día', pl: 'dzień', fr: 'journée', de: 'Tag', ru: 'день', nl: 'dag' },
    hours: {
        en: 'hours',
        it: 'ore',
        es: 'horas',
        pl: 'godziny',
        fr: 'heures',
        de: 'Stunden',
        ru: 'часов',
        nl: 'uren',
    },
    hour: { en: 'hour', it: 'ora', es: 'hora', pl: 'godzina', fr: 'heure', de: 'Stunde', ru: 'час', nl: 'uur' },
};