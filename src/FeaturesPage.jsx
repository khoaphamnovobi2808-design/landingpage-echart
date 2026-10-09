import { useState } from 'react'
import heroFeature from './assets/hero-feature.png'
import featurePreview from './assets/mockup-desktop.png'
import DesignIcon from './components/DesignIcon'
import './FeaturesPage.css'

const featureGroups = [
  { title: 'Nghiệp vụ bác sĩ', items: [
    { id: 'soap', title: 'Hồ sơ bệnh án điện tử (SOAP)', icon: 'feature-file.svg' },
    { id: 'results', title: 'Theo dõi kết quả lâm sàng', icon: 'feature-tests.svg' },
  ] },
  { title: 'Quản lý & vận hành phòng khám', items: [
    { id: 'patients', title: 'Quản lý thông tin bệnh nhân', icon: 'feature-users.svg' },
    { id: 'appointments', title: 'Quản lý lịch hẹn', icon: 'feature-calendar.svg' },
    { id: 'billing', title: 'Quản lý hóa đơn & tài chính', icon: 'coins' },
    { id: 'inventory', title: 'Quản lý kho thuốc', icon: 'feature-stock.svg' },
  ] },
]
const featureContent = {
  soap: {
    paragraphs: [
      'eChart hỗ trợ bác sĩ ghi nhận thông tin khám chữa bệnh theo cấu trúc SOAP, từ triệu chứng, tiền sử bệnh và dấu hiệu sinh tồn đến chẩn đoán và kế hoạch điều trị. Thông tin được lưu trữ theo từng lần khám, giúp bác sĩ dễ dàng tra cứu lịch sử bệnh án, theo dõi diễn tiến sức khỏe và có thêm cơ sở cho những lần điều trị tiếp theo.',
    ],
    highlights: [
      ['Quản lý thông tin bệnh nhân', 'Tổ chức nội dung khám theo Subjective, Objective, Assessment, Plan.'],
      ['Theo dõi lịch sử khám', 'Tra cứu các lần khám trước cùng chẩn đoán, đơn thuốc và thông tin điều trị.'],
      ['Chẩn đoán và kê đơn', 'Ghi nhận chẩn đoán bệnh theo mã ICD-10, lập kế hoạch điều trị và kê đơn thuốc.'],
      ['Tích lũy dữ liệu sức khỏe', 'Lưu lại thông tin lâm sàng, các tiền sử theo thời gian trong hồ sơ bệnh nhân.'],
    ],
  },
  results: {
    paragraphs: [
      'Lưu trữ và quản lý kết quả xét nghiệm, chẩn đoán hình ảnh và thủ thuật trong hồ sơ bệnh nhân.',
      'Bác sĩ có thể tra cứu các kết quả đã thực hiện ở những lần khám trước, đối chiếu thông tin và theo dõi quá trình khám chữa bệnh mà không phải tìm kiếm dữ liệu ở nhiều nơi.',
    ],
    highlights: [
      ['Lưu trữ kết quả xét nghiệm', 'Ghi nhận và lưu các kết quả xét nghiệm trong hồ sơ bệnh nhân.'],
      ['Quản lý kết quả CĐHA', 'Lưu thông tin và kết quả chẩn đoán hình ảnh.'],
      ['Theo dõi kết quả thủ thuật', 'Ghi nhận các kết quả thủ thuật đã thực hiện.'],
      ['Tra cứu theo lịch sử khám', 'Xem lại các kết quả được lưu từ những lần khám trước.'],
    ],
  },
  patients: {
    paragraphs: [
      'Thông tin bệnh nhân được quản lý tập trung tại một nơi. Giúp phòng khám tạo lập, cập nhật và tra cứu hồ sơ bệnh nhân trên cùng một hệ thống. Thông tin cá nhân và lịch sử khám được tổ chức rõ ràng, hỗ trợ nhân viên trong quá trình tiếp nhận và giúp bác sĩ nhanh chóng truy cập hồ sơ khi cần.',
    ],
    highlights: [
      ['Tạo hồ sơ bệnh nhân', 'Ghi nhận thông tin cá nhân khi bệnh nhân đến khám lần đầu.'],
      ['Quản lý kết quả CĐHA', 'Quản lý và điều chỉnh thông tin bệnh nhân khi có thay đổi.'],
      ['Tìm kiếm và tra cứu', 'Tìm hồ sơ bệnh nhân để phục vụ tiếp nhận và khám chữa bệnh.'],
      ['Liên kết lịch sử khám', 'Truy cập các lần khám đã được lưu trong hồ sơ bệnh nhân.'],
    ],
  },
  appointments: {
    paragraphs: [
      'Theo dõi và tổ chức các lịch hẹn có trong ngày của phòng khám trên giao diện lịch trực quan.',
      'Nhân viên có thể xem lịch theo ngày, tuần hoặc tháng, tạo lịch hẹn và cập nhật trạng thái cuộc hẹn, giúp việc điều phối hoạt động tiếp nhận và khám bệnh thuận tiện hơn.',
    ],
    highlights: [
      ['Lịch ngày, tuần và tháng', 'Chuyển đổi chế độ xem để theo dõi lịch khám phù hợp.'],
      ['Lọc lịch khám', 'Theo dõi lịch theo bác sĩ, dịch vụ hoặc trạng thái cuộc hẹn.'],
      ['Theo dõi trạng thái', 'Nắm bắt tiến trình cuộc hẹn từ xác nhận, check-in đến hoàn tất.'],
      ['Tạo và quản lý lịch hẹn', 'Ghi nhận thông tin bệnh nhân, thời gian và nội dung cuộc hẹn.'],
    ],
  },
  billing: {
    paragraphs: [
      'Hỗ trợ phòng khám ghi nhận chi phí phát sinh trong quá trình khám chữa bệnh, quản lý thông tin thanh toán và hóa đơn.',
      'Dữ liệu được tổ chức tập trung, giúp nhân viên thuận tiện tra cứu các khoản thu và hỗ trợ công việc quản lý tài chính hằng ngày.',
    ],
    highlights: [
      ['Ghi nhận chi phí', 'Quản lý các khoản chi phí liên quan đến hoạt động khám chữa bệnh.'],
      ['Theo dõi thanh toán', 'Tra cứu thông tin và trạng thái thanh toán.'],
      ['Quản lý hóa đơn', 'Lưu trữ và tra cứu thông tin hóa đơn.'],
      ['Hỗ trợ đối soát', 'Dễ dàng kiểm tra lại các giao dịch đã được ghi nhận.'],
    ],
  },
  inventory: {
    paragraphs: [
      'Phòng khám có thể thuận tiện quản lý danh mục thuốc và theo dõi số lượng tồn kho trên một hệ thống tập trung.',
      'Nhân viên có thể tra cứu thông tin thuốc và tình trạng tồn kho để hỗ trợ việc quản lý nguồn thuốc phục vụ hoạt động khám chữa bệnh.',
    ],
    highlights: [
      ['Quản lý danh mục thuốc', 'Lưu trữ và tra cứu thông tin các loại thuốc được quản lý tại phòng khám'],
      ['Theo dõi số lượng tồn kho', 'Nắm bắt số lượng thuốc hiện có trong kho.'],
      ['Tra cứu thông tin thuốc', 'Tìm kiếm thuốc phục vụ công việc quản lý và cấp phát.'],
      ['Hỗ trợ quản lý nguồn thuốc', 'Cung cấp thông tin tồn kho để nhân viên chủ động theo dõi.'],
    ],
  },
}

function FeatureIcon({ icon }) {
  return <span className="n-feature-leading" aria-hidden="true">
    {icon === 'coins' ? <span className="n-feature-coins">
      {[1, 2, 3, 4, 5].map((part) => <DesignIcon key={part} name={`feature-coins-${part}.svg`} className={`n-feature-coin-part n-feature-coin-${part}`} />)}
    </span> : <DesignIcon name={icon} />}
  </span>
}

export default function FeaturesPage() {
  const [activeId, setActiveId] = useState('soap')

  return <>
    <section className="n-hero n-features-hero" aria-labelledby="n-feature-page-title">
      <div className="n-hero-panel">
        <img className="n-hero-image" src={heroFeature} alt="Các giải pháp eChart kết nối hồ sơ bệnh án, lịch hẹn, kho thuốc và hóa đơn" fetchPriority="high" />
        <div className="n-hero-content">
          <h1 id="n-feature-page-title">Giải pháp cho phòng khám hiện đại</h1>
          <p>Từ hồ sơ bệnh án, khám chữa bệnh đến quản lý vận hành, eChart kết nối các hoạt động quan trọng của phòng khám trên một nền tảng thống nhất.</p>
          <a href="/contact" className="n-button">Đặt lịch Demo</a>
        </div>
      </div>
    </section>

    <section className="n-section n-container n-feature-solutions" aria-labelledby="n-solutions-title">
      <div className="n-heading">
        <h2 id="n-solutions-title">Giải pháp hỗ trợ khám chữa bệnh và<br /> vận hành phòng khám</h2>
        <p>Khám phá các nhóm chức năng của eChart, được thiết kế để hỗ trợ bác sĩ trong công việc chuyên môn và giúp phòng khám quản lý hoạt động hằng ngày hiệu quả hơn.</p>
      </div>
      <div className="n-feature-solutions-grid">
        <div className="n-feature-groups">
          {featureGroups.map((group, groupIndex) => <div className="n-feature-group" key={group.title}>
            <h3 id={`n-feature-group-${groupIndex}`}>{group.title}</h3>
            <ul className="n-feature-options" aria-labelledby={`n-feature-group-${groupIndex}`}>
              {group.items.map((item) => <li key={item.id}>
                <button id={`n-feature-option-${item.id}`} type="button" aria-pressed={activeId === item.id} aria-controls="n-feature-detail" onClick={() => setActiveId(item.id)}>
                  <FeatureIcon icon={item.icon} />
                  <span className="n-feature-option-label">{item.title}</span>
                  <DesignIcon name="feature-arrow.svg" className="n-feature-trailing" />
                </button>
              </li>)}
            </ul>
          </div>)}
        </div>
        <div className="n-feature-detail" id="n-feature-detail" role="region" aria-labelledby={`n-feature-option-${activeId}`}>
          {featureGroups.flatMap((group) => group.items).map((feature) => <div
            className={`n-feature-detail-content${activeId === feature.id ? ' is-active' : ''}`}
            key={feature.id}
            aria-hidden={activeId !== feature.id}
            inert={activeId !== feature.id}
          >
            <h3>{feature.title}</h3>
            <div className="n-feature-description">
              {featureContent[feature.id].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <img className="n-feature-soap-image" src={featurePreview} alt="Giao diện hồ sơ bệnh án điện tử eChart và các thông tin khám chữa bệnh" loading="lazy" />
            <h4>Các khả năng nổi bật</h4>
            <ul className="n-feature-highlights">
              {featureContent[feature.id].highlights.map(([title, detail]) => <li key={title}>
                <DesignIcon name="feature-check.svg" className="n-feature-check" />
                <div><h5>{title}</h5><p>{detail}</p></div>
              </li>)}
            </ul>
          </div>)}
        </div>
      </div>
    </section>

  </>
}
