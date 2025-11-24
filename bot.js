import { Telegraf, Markup } from 'telegraf'

const token = '8414038603:AAHcJRQQ6nF0RiRJ9RQ0tJd9XUmX9nSXL30'  // ← توکن خودت رو اینجا بذار
const bot = new Telegraf(token)

// وقتی کاربر /start بزنه
bot.start((ctx) => {
  const userName = ctx.from.first_name || 'دوست عزیز'
  ctx.replyWithHTML(
    `سلام ${userName} به FARSTAR خوش اومدی!\n\n` +
    `ماموریت‌های روزانه‌ت رو اینجا مدیریت کن\n` +
    `هر روز یادآوری می‌فرستم برات\n\n` +
    `برای ورود به پنل شخصی‌ت، دکمه زیر رو بزن:`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('ورود به FARSTAR', 'https://flat-pigs-taste.loca.lt')]
    ])
  )
})

// دستور /dashboard
bot.command('dashboard', (ctx) => {
  ctx.replyWithHTML(
    'پنل شخصی FARSTAR تو آماده‌ست',
    Markup.inlineKeyboard([
      [Markup.button.webApp('باز کردن داشبورد', 'https://flat-pigs-taste.loca.lt/dashboard')]
    ])
  )
})

// دستور /admin (فقط ادمین)
bot.command('admin', async (ctx) => {
  if (ctx.from.id === 707663135) { // ← آیدی تلگرامت رو اینجا بذار
    ctx.replyWithHTML(
      'ادمین کل سیستم وارد شد',
      Markup.inlineKeyboard([
        [Markup.button.webApp('پنل مخفی ادمین', 'https://flat-pigs-taste.loca.lt/admin')]
      ])
    )
  } else {
    ctx.reply('دسترسی ممنوع')
  }
})

// یادآوری روزانه (هر روز ساعت ۸ صبح)
setInterval(() => {
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()
  if (hour === 8 && minute === 0) {
    bot.telegram.sendMessage(
      723492349, // ← آیدی تلگرامت
      'ماموریت امروزت چیه؟\n\nهنوز شروع نکردی؟ بزن بریم!',
      Markup.inlineKeyboard([
        [Markup.button.webApp('شروع ماموریت', 'https://flat-pigs-taste.loca.lt/dashboard')]
      ])
    )
  }
}, 60000)

// راه‌اندازی ربات
bot.launch()
console.log('FARSTAR Telegram Bot فعال شد!')
console.log('ربات: @farstar_bot')