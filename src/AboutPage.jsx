import { useLayoutEffect, useRef } from 'react'
import aboutHero from './assets/hero-aboutus.png'
import aboutSoap from './assets/SOAP.png'
import aboutPrinciples from './assets/about-principles.png'
import DesignIcon from './components/DesignIcon'
import ReasonsSection from './components/ReasonsSection'
import './AboutPage.css'

const principles = [
  ['principle-ease.svg', 'Dễ sử dụng trong công việc hằng ngày', 'Giao diện đơn giản, rõ ràng, phù hợp với quy trình phòng khám Việt Nam.'],
  ['principle-soap.svg', 'Dựa trên cấu trúc bệnh án SOAP', 'Tổ chức thông tin theo tiêu chuẩn quốc tế, hỗ trợ ghi nhận và theo dõi toàn diện.'],
  ['principle-history.svg', 'Dữ liệu tích lũy liên tục theo thời gian', 'Tích lũy tiền sử, thuốc, chẩn đoán, kết quả và quá trình điều trị của bệnh nhân.'],
  ['principle-connect.svg', 'Kết nối bác sĩ và bệnh nhân tốt hơn', 'Mở rộng chăm sóc sau buổi khám thông qua ứng dụng dành cho bệnh nhân'],
]

const visits = [
  { date: '04/04/2025', dateTime: '2025-04-04', title: 'Khám tổng quát' },
  { date: '12/10/2024', dateTime: '2024-10-12', title: 'Tái khám' },
  { date: '22/06/2024', dateTime: '2024-06-22', title: 'Khám chuyên khoa' },
]

function HealthTimeline() {
  const timelineRef = useRef(null)

  useLayoutEffect(() => {
    const panel = timelineRef.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!panel || preference.matches || !('IntersectionObserver' in window)) return
    panel.classList.add('is-motion-ready')
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      panel.classList.add('is-revealed')
      observer.disconnect()
    }, { threshold: 0.15, rootMargin: '0px 0px -48px 0px' })
    observer.observe(panel)

    function finishMotion() {
      observer.disconnect()
      panel.classList.remove('is-motion-ready', 'is-revealed')
    }
    function handlePreference() {
      if (preference.matches) finishMotion()
    }
    function handlePageShow(event) {
      if (event.persisted) finishMotion()
    }
    preference.addEventListener('change', handlePreference)
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      finishMotion()
      preference.removeEventListener('change', handlePreference)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return <div className="n-health-timeline" ref={timelineRef} role="group" aria-label="Minh họa hồ sơ sức khỏe theo thời gian">
    <div className="n-timeline-patient">
      <span className="n-timeline-avatar" aria-hidden="true">QH</span>
      <div><h3>Nguyễn Hoàng Quang Huy</h3><p>Nam, 38 tuổi <span aria-hidden="true">·</span> ID: 00012S45</p></div>
    </div>
    <div className="n-timeline-track">
      <span className="n-timeline-line" aria-hidden="true" />
      <ol className="n-timeline-visits">
        {visits.map((visit, index) => <li className="n-timeline-visit" key={visit.dateTime} style={{ '--visit-delay': `${250 + index * 450}ms` }}>
          <span className="n-timeline-dot" aria-hidden="true" />
          <time dateTime={visit.dateTime}>{visit.date}</time>
          <div className="n-timeline-visit-copy"><h4>{visit.title}</h4><p>BS. Phùng Quốc Thái</p></div>
          <ul className="n-timeline-tags" aria-label={`Thông tin lần khám ${visit.date}`}>
            <li>Chẩn đoán</li><li>Đơn thuốc</li><li>Xét nghiệm</li>
          </ul>
        </li>)}
      </ol>
      <div className="n-timeline-continuation" aria-hidden="true"><span /><span /><span /></div>
    </div>
  </div>
}

export default function AboutPage() {
  return <>
    <section className="n-hero n-about-hero" aria-labelledby="n-about-title">
      <div className="n-hero-panel">
        <img className="n-hero-image" src={aboutHero} alt="Bác sĩ trao đổi với bệnh nhân tại phòng khám" fetchPriority="high" />
        <div className="n-hero-content">
          <h1 id="n-about-title">Về chúng tôi</h1>
          <p>eChart được xây dựng bởi đội ngũ Nobiware với gần 20 năm kinh nghiệm phát triển phần mềm cho thị trường Mỹ, mang những kinh nghiệm trong lĩnh vực công nghệ y tế đến gần hơn với các phòng khám tại Việt Nam.</p>
        </div>
      </div>
    </section>
    <section className="n-section n-container n-about-story" aria-labelledby="n-about-story-title">
      <div className="n-about-text">
        <h2 id="n-about-story-title">Vì sao chung tôi xây dựng eChart</h2>
        <p>Trong quá trình phát triển các giải pháp y tế cho thị trường Mỹ, chúng tôi nhận thấy giá trị của dữ liệu bệnh nhân được tích lũy liên tục theo thời gian.</p>
        <p>Từ kinh nghiệm đó, eChart được xây dựng cho các phòng khám Việt Nam, giúp bác sĩ dễ dàng quản lý và theo dõi quá trình chăm sóc bệnh nhân.</p>
      </div>
      <img className="n-about-soap" src={aboutSoap} alt="Bác sĩ theo dõi hồ sơ theo cấu trúc SOAP trên máy tính bảng" loading="lazy" />
    </section>
    <section className="n-section n-container n-about-principles" aria-labelledby="n-principles-title">
      <div className="n-heading">
        <h2 id="n-principles-title">Những điều chúng tôi luôn đặt lên hàng đầu</h2>
        <p>eChart được xây dựng dựa trên những nguyên tắc quan trọng, nhằm mang lại giá trị thực sự cho bác sĩ, nhân viên y tế và bệnh nhân.</p>
      </div>
      <div className="n-about-principles-grid">
        <img className="n-about-doctor" src={aboutPrinciples} alt="Bác sĩ tư vấn và chăm sóc bệnh nhân" loading="lazy" />
        <div className="n-reason-grid n-about-principle-cards">
          {principles.map(([icon, title, detail]) => <article key={title}>
            <DesignIcon name={icon} className="n-reason-icon" />
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className="n-section n-about-record" aria-labelledby="n-record-title">
      <div className="n-about-record-copy">
        <div className="n-about-text">
          <h2 id="n-record-title">Hướng đến một hồ sơ sức khỏe toàn vẹn theo thời gian</h2>
          <p>Xa hơn một hệ thống EMR, eChart hướng đến việc xây dựng nền tảng hiển thị đầy đủ và liên tục dữ liệu sức khỏe của mỗi bệnh nhân.</p>
          <p>Giúp bác sĩ có cái nhìn toàn diện hơn về quá trình chăm sóc, đồng thời duy trì kết nối với bệnh nhân tốt hơn trong suốt hành trình điều trị.</p>
        </div>
        <a className="n-button" href="/features">Tìm hiểu tính năng và giải pháp<DesignIcon name="arrow-up-right-white.svg" /></a>
      </div>
      <HealthTimeline />
    </section>
    <ReasonsSection />
  </>
}
