import featurePreview from './assets/mockup-desktop.png'
import DesignIcon from './components/DesignIcon'
import './FeaturesPage.css'

export default function FeaturesPage() {
  return <section className="n-feature-page n-container" aria-labelledby="n-feature-page-title">
    <div className="n-feature-copy">
      <span className="n-feature-status"><span aria-hidden="true" />Nội dung đang được xây dựng</span>
      <h1 id="n-feature-page-title">Tính năng &amp;<br />giải pháp</h1>
      <p>Chúng tôi đang hoàn thiện nội dung để bạn có thể khám phá rõ hơn cách eChart hỗ trợ công việc hằng ngày của phòng khám.</p>
      <p className="n-feature-invitation">Trong thời gian chờ đợi, hãy trao đổi cùng đội ngũ eChart để tìm hiểu giải pháp phù hợp với phòng khám của bạn.</p>
      <div className="n-feature-actions">
        <a className="n-button" href="/contact">Đặt lịch Demo<DesignIcon name="arrow-up-right-white.svg" /></a>
        <a className="n-feature-home" href="/">Về trang chủ <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <div className="n-feature-visual">
      <span className="n-feature-preview-label">Một góc trải nghiệm eChart</span>
      <img src={featurePreview} alt="Minh họa giao diện eChart quản lý hồ sơ bệnh án, chẩn đoán và đơn thuốc" />
      <div className="n-feature-preview-caption">
        <DesignIcon name="imgClipboard.svg" />
        <div><h2>Kết nối thông tin, hỗ trợ chăm sóc</h2><p>Từ hồ sơ bệnh án đến hành trình điều trị.</p></div>
      </div>
    </div>
  </section>
}
