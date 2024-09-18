function getFirstMondayOfMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const diff = 1 - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(firstDayOfMonth.setDate(diff));
}

function getLunarDay(date) {
  const day = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", { day: "numeric" }).format(date).match(/\d+/)[0];
  return day;
}

function getZodiacYear(year) {
  const zodiac = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  return zodiac[(year - 4) % 12];
}

function getCanChiYear(year) {
  const can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  return can[(year - 4) % 10] + " " + chi[(year - 4) % 12];
}

class LunarCalendar extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = '';
      this.content = document.createElement('div');
      this.content.style.padding = '0px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfWeekText = Intl.DateTimeFormat("vi-VN", { weekday: "long" }).format(date);
    const dayOfMonth = date.getDate();
    const lunarMonth = Intl.DateTimeFormat("zh-TW-u-ca-chinese", { month: "numeric" }).format(date);
    const lunarDay = getLunarDay(date);
    const zodiacYear = getZodiacYear(year);
    const canChiYear = getCanChiYear(year);
    const firstMonday = getFirstMondayOfMonth(year, month);
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    var m='';
    var currdate = (new Date()).toLocaleDateString('en-GB'),
    m = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", { month: "numeric" }).format(date),
    d = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", { day: "numeric" }).format(date).match(/\d+/)[0];


    if (String(m).match(/\d+/)) {
      var y = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
        year: "numeric"
      }).format(date).match(/\d+/)[0],
        m = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
          month: "numeric"
        }).format(date).match(/\d+/)[0],
        can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"],
        chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

      y = can[(y - 1) % 10] + ' ' + chi[(y - 1) % 12];
    } else {
      var m = Intl.DateTimeFormat("zh-TW-u-ca-chinese", {month: "numeric"}).format(date).replace(/閏|月|正|二|三|四|五|六|七|八|九|十|冬|臘/gu, function (x) {
        return {
            閏: '*', // nhuan
            月: '',
            正: '1',
            二: '2',
            三: '3',
            四: '4',
            五: '5',
            六: '6',
            七: '7',
            八: '8',
            九: '9',
            十: '10',
            冬: '11',
            臘: '12'
        }[x];
    }),
    y = Intl.DateTimeFormat("zh-TW-u-ca-chinese", {year: "numeric"}).format(date).replace(/\d+/gu, '').replace(/年|甲|乙|丙|丁|戊|己|庚|辛|壬|癸|子|丑|寅|卯|辰|巳|午|未|申|酉|戌|亥/gu, function (x) {

        return {

            年: "",
            甲: "Giáp ",
            乙: "Ất ",
            丙: "Bính ",
            丁: "Đinh ",
            戊: "Mậu ",
            己: "Kỷ ",
            庚: "Canh ",
            辛: "Tân ",
            壬: "Nhâm ",
            癸: "Quý ",
            子: "Tý",
            丑: "Sửu",
            寅: "Dần",
            卯: "Mão",
            辰: "Thìn",
            巳: "Tỵ",
            午: "Ngọ",
            未: "Mùi",
            申: "Thân",
            酉: "Dậu",
            戌: "Tuất",
            亥: "Hợi"
        }[x];
    });
    };
    let html = `
      <div class="ldate">
        <div class="info">
          <div>${dayOfWeekText}, ${dayOfMonth}/${month + 1}/${year}</div>
          <div>${lunarDay}/${m} (${canChiYear})</div>
        </div>
        <div class="week">`;

    for (let i = 0; i < lastDayOfMonth; i++) {
      const currentDate = new Date(year, month, i + 1);
      const lunarDay = getLunarDay(currentDate);
      const dayOfWeek = currentDate.getDay();
      const dayOfWeekText = Intl.DateTimeFormat("vi-VN", { weekday: "long" }).format(currentDate);
      const isToday = currentDate.toDateString() === date.toDateString();

      html += `
        <div class="we ${dayOfWeek === 0 ? 'red' : ''} ${isToday ? 'today' : ''}">
          <div class="we0">${dayOfWeekText}</div>
          <div class="we1">${currentDate.getDate()}</div>
          <div class="we2">${lunarDay}</div>
        </div>`;
    }

    html += `
        </div>
      </div>
      <style>
        body {
          font-family: Arial, sans-serif;
          --background-color: #fff; /* Light background color */
          --text-color: #333; /* Dark text color */
          --border-color: #ccc; /* Border color */
          --shadow-color: rgba(0, 0, 0, 0.1); /* Light shadow color */
        }
        
        @media (prefers-color-scheme: dark) {
          body {
            --background-color: #333; /* Dark background color */
            --text-color: #fff; /* Light text color */
            --border-color: #555; /* Dark border color */
            --shadow-color: rgba(0, 0, 0, 0.6); /* Dark shadow color */
          }
        }
        
        .ldate {
          margin: auto;
          position: relative;
          border: 2px solid var(--border-color);
          border-radius: 10px;
          box-shadow: 0 4px 8px var(--shadow-color);
        }
        
        .ldate .info {
          font-size: 1.2em;
          text-align: center;
          margin-bottom: 10px;
          background-color: var(--background-color);
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          padding: 10px;
        }
        
        .ldate .week {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          background-color: var(--background-color);
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 10px;
        }
        
        .ldate .we {
          width: calc(100% / 7);
          text-align: center;
          padding: 10px 0;
        }
        
        .ldate .we0 {
          font-size: 0.8em;
          color: #A2A2A2;
        }
        
        .ldate .we.red .we0 {
          color: #FF0000;
        }
        
        .ldate .we1 {
          font-size: 1.2em;
        }
        
        .ldate .we2 {
          font-size: 0.8em;
          color: #A2A2A2;
        }
        
        .ldate .we.today {
          background-color: #639FED;
          color: #ffffff;
        }
        
        .ldate .we.today .we1,
        .ldate .we.today .we2,
        .ldate .we.today .we0 {
          color: #ffffff;
        }

      </style>`;

    this.content.innerHTML = html;
  }

  setConfig(config) {}

  getCardSize() {
    return 3;
  }
}

customElements.define('lunar-calendar', LunarCalendar);
