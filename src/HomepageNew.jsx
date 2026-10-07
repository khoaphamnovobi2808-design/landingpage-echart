import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getImage, workflowImages, getDesignIcon } from './media'
import capabilityImage from './assets/capabilities.png'
import './fonts.css'
import './HomepageNew.css'
import AboutPage from './AboutPage'
import DemoContact from './DemoContact'
import FeaturesPage from './FeaturesPage'
import DesignIcon from './components/DesignIcon'
import ReasonsSection from './components/ReasonsSection'

const sharedImages = { 'imgImage2.png': 'hero.png', 'imgImage13.png': 'feature-daily.png', 'imgImage22.png': 'feature-records.png', 'imgImage18.png': 'feature-connect.png', 'imgImage23.png': 'workflow.png', 'imgLogo.png': 'logo.png' }
const asset = (name) => sharedImages[name] ? getImage(sharedImages[name]) : getDesignIcon(name)
const nav = [['/', 'Trang chủ'], ['/about', 'Về chúng tôi'], ['/features', 'Tính năng & giải pháp']]
const values = [
  ['imgImage13.png', 'eChart được thiết kế để bác sĩ dễ dàng sử dụng hàng ngày', 'Được thiết kế dựa trên các công việc bác sĩ thường xuyên thực hiện trong quá trình khám và điều trị'],
  ['imgImage22.png', 'Tùy chỉnh hồ sơ bệnh án điện tử theo từng chuyên khoa bác sĩ', 'Nội dung và cấu trúc hồ sơ bệnh án có thể được điều chỉnh theo đặc thù và nhu cầu sử dụng của từng chuyên khoa'],
  ['imgImage18.png', 'Kết nối phòng khám với bệnh nhân ngay cả sau buổi khi khám', 'Thông qua eChart App, bệnh nhân có thể tiếp tục theo dõi thông tin sức khỏe, lịch sử khám và quá trình điều trị sau khi rời phòng khám'],
]
const capabilities = [
  ['imgClipboard.svg', 'Hồ sơ bệnh án điện tử', 'Tùy chỉnh hồ sơ bệnh án điện tử theo nhu cầu của từng chuyên khoa.'],
  ['imgUsers.svg', 'Quản lý bệnh nhân', 'Quản lý thông tin bệnh nhân và tạo hồ sơ cho bệnh nhân mới.'],
  ['imgCalendarClock.svg', 'Quản lý lịch hẹn', 'Theo dõi lịch hẹn theo ngày, tuần hoặc tháng trên eChart.'],
  ['imgTestTubes.svg', 'Theo dõi kết quả lâm sàng', 'Theo dõi kết quả lâm sàng trong hồ sơ bệnh nhân.'],
  ['imgHandCoins.svg', 'Tài chính - hóa đơn', 'Quản lý tài chính và hóa đơn của phòng khám trên một nền tảng.'],
]
const steps = [
  ['imgVector1.svg', 'Tiếp nhận bệnh nhân', [
    'Quản lý thông tin bệnh nhân, tạo hồ sơ cho bệnh nhân mới',
    'Quản lý lịch hẹn theo dõi theo ngày, tuần hoặc tháng trên eChart',
  ]],
  ['imgStethoscope.svg', 'Khám bệnh', [
    'Ghi nhận lý do khám, sinh hiệu và thông tin lâm sàng.',
    'Dữ liệu tiền sử, thuốc sử dụng và các chẩn đoán từ các lần khám trước được tích lũy theo thời gian',
    'Giúp bác sĩ theo dõi xuyên suốt quá trình điều trị của bệnh nhân tại phòng khám',
  ]],
  ['imgVector3.svg', 'Chẩn đoán & kế hoạch điều trị', [
    'Chẩn đoán bệnh theo hệ thống mã ICD-10',
    'Xây dựng kế hoạch điều trị, thực hiện các chỉ định lâm sàng  ',
    'Kê đơn thuốc liên thông với Đơn thuốc Quốc gia theo quy định của Bộ Y tế',
  ]],
  ['imgVector4.svg', 'Kết thúc buổi khám', [
    'Sử dụng chữ ký số đế ký phiếu khám, đơn thuốc sau khi kết thúc buổi khám',
    'Quản lý hóa đơn, thanh toán trực tiếp trên eChart.',
  ]],
]

export default function HomepageNew() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isHome = pathname === '/'
  const isAbout = pathname === '/about'
  const isDemo = pathname === '/contact'
  const isFeatures = pathname === '/features'
  const [scrolled, setScrolled] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY)
    let distance = 0
    let direction = 0
    const onScroll = () => {
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const currentY = Math.min(maxY, Math.max(0, window.scrollY))
      const delta = currentY - previousY
      previousY = currentY
      if (currentY <= 16) {
        setScrolled(false)
        setHeaderHidden(false)
        distance = 0
        direction = 0
        return
      }
      if (delta === 0) return
      const nextDirection = Math.sign(delta)
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta)
      direction = nextDirection
      // Ignore tiny trackpad movements to avoid flickering between states.
      if (distance >= 8) {
        setHeaderHidden(direction > 0)
        setScrolled(direction < 0)
        distance = 0
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [openValue, setOpenValue] = useState(null)
  const valuesRef = useRef(null)
  const workflowRef = useRef(null)
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!page || preference.matches || !('IntersectionObserver' in window)) return

    const targets = [...page.querySelectorAll([
      '.n-hero-content > *', '.n-page-intro > *', '.n-heading > *',
      '.n-value', '.n-capability-photo', '.n-capability-list > li', '.n-more',
      '.n-workflow-copy > h2', '.n-step', '.n-workflow-photo', '.n-controls',
      '.n-reason-grid > article', '.n-contact > *', '.n-footer-nav > nav',
      '.n-about-text > *', '.n-about-soap', '.n-about-doctor', '.n-about-timeline',
      '.n-about-record-copy > .n-button', '.n-demo-copy > h1', '.n-demo-benefits > h2',
      '.n-demo-benefits li', '.n-demo-form',
      '.n-feature-copy > *', '.n-feature-visual',
    ].join(', '))]
    const seen = new Set()
    const animations = new Map()
    const siblingOrder = new Map()
    const delays = new Map()

    targets.forEach((element) => {
      const order = siblingOrder.get(element.parentElement) || 0
      delays.set(element, Math.min(order * 100, 200))
      siblingOrder.set(element.parentElement, order + 1)
      element.classList.add('n-reveal-pending')
    })

    function reveal(element, immediate = false) {
      if (seen.has(element)) return
      seen.add(element)
      element.classList.remove('n-reveal-pending')
      if (immediate || preference.matches) return
      const animation = element.animate([
        { opacity: 0, translate: '0 0.75rem' },
        { opacity: 1, translate: '0 0' },
      ], {
        duration: 1200,
        delay: delays.get(element) || 0,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'backwards',
      })
      animations.set(element, animation)
      animation.onfinish = () => animations.delete(element)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        reveal(target)
        observer.unobserve(target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' })

    targets.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.bottom <= 0) reveal(element, true)
      else observer.observe(element)
    })

    // Keyboard navigation must never land on a fading or delayed control.
    function handleFocus(event) {
      targets.forEach((element) => {
        if (!element.contains(event.target)) return
        observer.unobserve(element)
        reveal(element, true)
        animations.get(element)?.cancel()
        animations.delete(element)
      })
    }
    function finishMotion() {
      observer.disconnect()
      targets.forEach((element) => element.classList.remove('n-reveal-pending'))
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }
    function handlePreference() {
      if (preference.matches) finishMotion()
    }
    function handlePageShow(event) {
      if (event.persisted) finishMotion()
    }
    page.addEventListener('focusin', handleFocus)
    preference.addEventListener('change', handlePreference)
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      finishMotion()
      page.removeEventListener('focusin', handleFocus)
      preference.removeEventListener('change', handlePreference)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  useLayoutEffect(() => {
    const column = workflowRef.current
    if (!column) return
    let previousWidth = 0
    function reserveExpandedHeight() {
      const width = column.getBoundingClientRect().width
      if (width === previousWidth) return
      previousWidth = width
      const cards = [...column.querySelectorAll('.n-step')]
      let closedHeight = 0
      let maxDetailsHeight = 0
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
      for (const card of cards) {
        const list = card.querySelector('ul')
        const detailHeight = list.getBoundingClientRect().height
        const style = getComputedStyle(card)
        closedHeight += card.querySelector('h3').getBoundingClientRect().height
          + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
        maxDetailsHeight = Math.max(maxDetailsHeight, detailHeight)
        card.style.setProperty('--step-detail-height', `${detailHeight / rootSize}rem`)
      }
      const headingHeight = column.querySelector('h2').getBoundingClientRect().height
      const sectionGap = parseFloat(getComputedStyle(column).gap) || 0
      const cardsGap = parseFloat(getComputedStyle(column.querySelector('.n-steps')).gap) || 0
      const height = headingHeight + sectionGap + closedHeight + cardsGap * (cards.length - 1) + maxDetailsHeight
      column.style.setProperty('--workflow-content-height', `${height / rootSize}rem`)
    }
    reserveExpandedHeight()
    const observer = new ResizeObserver(reserveExpandedHeight)
    observer.observe(column)
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) {
        previousWidth = 0
        reserveExpandedHeight()
      }
    })
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    const container = valuesRef.current
    if (!container) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let previousWidth = container.clientWidth

    function animateAlignment(animate) {
      cancelAnimationFrame(frame)
      const width = container.clientWidth
      const gap = parseFloat(getComputedStyle(container).columnGap)
      const isColumn = getComputedStyle(container).flexDirection === 'column'
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
      const columnWidth = container.firstElementChild.getBoundingClientRect().width
      container.style.setProperty('--value-closed-width', `${(isColumn ? columnWidth : (width - 2 * gap) / 3) / rootSize}rem`)
      container.style.setProperty('--value-open-width', `${(isColumn ? columnWidth : (2 * width - gap) / 3) / rootSize}rem`)
      const target = openValue === null || isColumn ? 0 : openValue * (width + gap) / 6
      const start = container.scrollLeft
      const startedAt = performance.now()

      function tick(now) {
        const progress = animate && !reducedMotion.matches ? Math.min((now - startedAt) / 500, 1) : 1
        // Match the card's cubic-bezier(0.4, 0, 0.2, 1) transition.
        let low = 0
        let high = 1
        for (let i = 0; i < 16; i += 1) {
          const t = (low + high) / 2
          const x = 3 * (1 - t) ** 2 * t * 0.4 + 3 * (1 - t) * t ** 2 * 0.2 + t ** 3
          if (x < progress) low = t
          else high = t
        }
        const t = (low + high) / 2
        const eased = progress === 1 ? 1 : 3 * (1 - t) * t ** 2 + t ** 3
        container.scrollTo({ left: start + (target - start) * eased, behavior: 'instant' })
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    animateAlignment(true)
    const observer = new ResizeObserver(() => {
      if (container.clientWidth !== previousWidth) {
        previousWidth = container.clientWidth
        animateAlignment(false)
      }
    })
    observer.observe(container)
    const stopAlignment = () => cancelAnimationFrame(frame)
    const updateMotion = () => animateAlignment(false)
    container.addEventListener('pointerdown', stopAlignment)
    container.addEventListener('wheel', stopAlignment, { passive: true })
    reducedMotion.addEventListener('change', updateMotion)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      container.removeEventListener('pointerdown', stopAlignment)
      container.removeEventListener('wheel', stopAlignment)
      reducedMotion.removeEventListener('change', updateMotion)
    }
  }, [openValue])
  const [activeStep, setActiveStep] = useState(0)
  const [openStep, setOpenStep] = useState(null)
  function changeStep(direction) { const next = (activeStep + direction + steps.length) % steps.length; setActiveStep(next); setOpenStep(next) }
  return <div className={`new-home ${isHome || isAbout ? '' : 'n-inner-page'} ${isDemo ? 'n-demo-page' : ''}`} id="top" ref={pageRef}>
    <header className={`n-header ${scrolled ? 'is-scrolled' : ''} ${headerHidden && !menuOpen ? 'is-hidden' : ''}`}><a href="/" className="n-brand" aria-label="eChart — Trang chủ"><img src={asset('imgLogo.png')} width="129" height="30" alt="eChart" /></a><nav className={`n-nav ${menuOpen ? 'is-open' : ''}`} id="n-navigation" aria-label="Điều hướng chính">{nav.map(([id, title]) => <a href={id} key={id} aria-current={pathname === id ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{title}</a>)}</nav><a href="/contact" className="n-button n-header-cta">Liên hệ Demo</a><button className="n-menu" aria-expanded={menuOpen} aria-controls="n-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Đóng' : 'Menu'}</button></header>
    <main>
      {isAbout && <AboutPage />}
      {isDemo && <DemoContact />}
      {isFeatures && <FeaturesPage />}
      {!isHome && !isAbout && !isDemo && !isFeatures && <section className="n-page-intro n-container">
        <h1>Không tìm thấy trang</h1>
        <p>Trang bạn tìm kiếm hiện chưa có nội dung.</p>
      </section>}
      {(isHome) && <section className="n-hero" aria-labelledby="n-title"><div className="n-hero-panel"><img className="n-hero-image" src={asset('imgImage2.png')} alt="Bác sĩ tư vấn cho bệnh nhân tại phòng khám" fetchPriority="high" /><div className="n-hero-content"><h1 id="n-title">Nền tảng số cho<br />y học gia đình</h1><p>eChart đơn giản hóa hoạt động khám chữa bệnh, giúp phòng khám giảm công việc thủ công và dành nhiều thời gian hơn cho việc chăm sóc bệnh nhân</p><a href="/contact" className="n-button">Trao đổi với chuyên gia</a></div></div></section>}
      {isHome && <section className="n-section n-container" id="about" aria-labelledby="n-values-title"><div className="n-heading"><h2 id="n-values-title">Giá trị eChart mang lại</h2><p>Được xây dựng từ nhu cầu vận hành thực tế của phòng khám, tập trung vào trải nghiệm thực tế của bác sĩ, tính linh hoạt theo từng chuyên khoa và khả năng kết nối với bệnh nhân.</p></div><div className="n-values" ref={valuesRef}>{values.map(([photo, title, detail], index) => <article className={`n-value n-value-${index + 1} ${openValue === index ? 'is-open' : ''}`} key={photo}><img className="n-value-image" src={asset(photo)} alt="" loading="lazy" /><div className="n-value-shade" /><button className="n-value-toggle" aria-expanded={openValue === index} aria-controls={`n-value-${index}`} aria-label={`${openValue === index ? 'Thu gọn' : 'Tìm hiểu thêm'}: ${title}`} onClick={() => setOpenValue(openValue === index ? null : index)}><span className="n-value-toggle-symbol" aria-hidden="true"><DesignIcon name="imgVector.svg" className="n-value-plus" /><DesignIcon name="value-minus.svg" className="n-value-minus" /></span></button><div className="n-value-copy n-value-copy-collapsed" aria-hidden={openValue === index}><h3>{title}</h3></div><div className="n-value-copy n-value-copy-expanded" id={`n-value-${index}`} aria-hidden={openValue !== index} inert={openValue !== index}><h3>{title}</h3><p>{detail}</p></div></article>)}</div></section>}
      {isHome && <section className="n-section n-container n-capabilities" id="features" aria-labelledby="n-features-title">
        <div className="n-heading">
          <h2 id="n-features-title">Khám phá những gì eChart có thể làm</h2>
          <p>Quản lý các hoạt động quan trọng của phòng khám trên một nền tảng thống nhất, đơn giản và dễ sử dụng.</p>
        </div>
        <div className="n-capability-grid">
          <div className="n-capability-photo">
            <img src={capabilityImage} alt="Giao diện hồ sơ bệnh án eChart với sinh hiệu, kết quả xét nghiệm, chẩn đoán, đơn thuốc và chỉ định lâm sàng" loading="lazy" />
          </div>
          <ul className="n-capability-list">
            {capabilities.map(([icon, title]) => <li key={title}>
              <div className="n-capability-row">
                <DesignIcon name={icon} />
                <span>{title}</span>
              </div>
            </li>)}
          </ul>
        </div>
        <a href="/features" className="n-button n-button-outline n-more">
          Tính năng và giải pháp
          <DesignIcon name="arrow-up-right.svg" />
        </a>
      </section>}
      {isHome && <section className="n-section n-container n-workflow" aria-labelledby="n-workflow-title"><div className="n-workflow-copy" ref={workflowRef}><h2 id="n-workflow-title">Một buổi khám diễn ra<br />trên eChart thế nào?</h2><div className="n-steps">{steps.map(([icon, title, detail], index) => <div className={`n-step ${openStep === index ? 'is-open' : ''}`} key={title}><h3><button aria-expanded={openStep === index} aria-controls={`n-step-${index}`} onClick={() => {setActiveStep(index);setOpenStep(openStep === index ? null : index)}}><DesignIcon name={icon} className="n-step-icon" /><span>{title}</span><DesignIcon name="imgVector2.svg" className={`n-step-plus ${openStep === index ? 'is-open' : ''}`} /></button></h3><div className="n-step-detail" id={`n-step-${index}`} aria-hidden={openStep !== index} inert={openStep !== index}><ul>{detail.map((line) => <li key={line}>{line}</li>)}</ul></div></div>)}</div></div><div className="n-workflow-visual"><div className="n-workflow-photo">{workflowImages.map((image, index) => <img key={image} className={activeStep === index ? 'is-active' : ''} src={image} alt={activeStep === index ? steps[index][1] : ''} aria-hidden={activeStep !== index} loading="lazy" />)}</div><div className="n-controls"><span className="n-icon n-progress" style={{ '--progress': `${(activeStep + 1) * 25}%` }} aria-hidden="true"><span /></span><span aria-live="polite">{activeStep + 1}/4</span><div className="n-arrows"><button aria-label="Bước trước" onClick={() => changeStep(-1)}><DesignIcon name="imgArrowLeft.svg" /></button><button aria-label="Bước tiếp theo" onClick={() => changeStep(1)}><DesignIcon name="imgArrowLeft1.svg" /></button></div></div></div></section>}
      {isHome && <ReasonsSection />}
    </main>
    <footer className={`n-footer ${isDemo ? 'n-footer-compact' : ''}`} id="contact">{!isDemo && <><div className="n-footer-bg" aria-hidden="true" /><div className="n-container n-contact"><h2>Khám phá eChart có thể mang lại<br />giá trị gì cho phòng khám của bạn</h2><a className="n-button n-button-light" href="/contact">Đặt lịch Demo</a></div><div className="n-divider" aria-hidden="true" /></>}<div className="n-container n-footer-nav"><nav aria-label="Điều hướng chân trang"><a href="/about">Về chúng tôi</a><a href="/features">Tính năng &amp; Giải pháp</a><a href="/contact">Liên hệ</a></nav><nav aria-label="Chính sách"><a href="#privacy">Chính sách bảo mật</a><a href="#terms">Điều khoản sử dụng</a></nav></div></footer>
  </div>
}
