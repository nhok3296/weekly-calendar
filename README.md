# Weekly-Calendar
Đây là custom card hiển thị lịch tuần, có cả âm lịch cho lovelace của Homeassistant
![Weekly-Calendar]([https://raw.githubusercontent.com/ninhvanthang/weekly-calendar/master/preview.jpg](https://github.com/nhok3296/weekly-calendar/blob/master/FB_IMG_1726633936412.jpg))

## Hướng dẫn cài đặt:

Thêm  dòng code sau vào phần resource trong lovelace

```yaml
- url: https://raw.githubusercontent.com/ninhvanthang/weekly-calendar/master/lunar_calendar.js
  type: js
```

Thêm một custom card vào lovelace 
```yaml
- type: custom:lunar-calendar
```

