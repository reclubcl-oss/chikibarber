;(async function () {
  const SB_URL  = 'https://xljymxrjejbqynskumwu.supabase.co'
  const SB_ANON = 'sb_publishable_0QkYeDhmKK4Ck-AY8fQScg_uyOXJUeO'
  const H = { apikey: SB_ANON, Authorization: 'Bearer ' + SB_ANON }

  try {
    const r = await fetch(SB_URL + '/rest/v1/site_config?select=key,value', { headers: H })
    if (!r.ok) return
    const rows = await r.json()
    if (!Array.isArray(rows) || !rows.length) return

    const cfg = {}
    rows.forEach(function (row) { cfg[row.key] = row.value })

    const root = document.documentElement

    if (cfg.color_bg)     root.style.setProperty('--bg',    cfg.color_bg)
    if (cfg.color_s1) {
      root.style.setProperty('--s1',   cfg.color_s1)
      root.style.setProperty('--s2',   cfg.color_s1)
    }
    if (cfg.color_accent) root.style.setProperty('--pure',  cfg.color_accent)
    if (cfg.color_text)   root.style.setProperty('--white', cfg.color_text)

    /* Fonts */
    var families = []
    if (cfg.font_heading) families.push('family=' + encodeURIComponent(cfg.font_heading) + ':wght@400;600;700;800')
    if (cfg.font_body)    families.push('family=' + encodeURIComponent(cfg.font_body)    + ':wght@300;400;500')
    if (families.length) {
      var link = document.createElement('link')
      link.rel  = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?' + families.join('&') + '&display=swap'
      document.head.appendChild(link)
    }
    if (cfg.font_heading) {
      root.style.setProperty('--font-heading', "'" + cfg.font_heading + "', sans-serif")
      document.querySelectorAll('[style*="Syne"],[class*="syne"]').forEach(function (el) {
        el.style.fontFamily = "'" + cfg.font_heading + "', sans-serif"
      })
    }
    if (cfg.font_body) {
      document.body.style.fontFamily = "'" + cfg.font_body + "', sans-serif"
    }

    /* Hero image */
    if (cfg.hero_image) {
      var src = cfg.hero_image.startsWith('http') ? cfg.hero_image : cfg.hero_image
      document.querySelectorAll('.hero-photo,.about-photo').forEach(function (img) {
        img.src = src
      })
    }
  } catch (e) { /* silencioso si Supabase no responde */ }
})()
