import DesignIcon from './DesignIcon'

const reasons = [
  ['imgVector5.svg', 'Quy mô phục vụ', 'Từ phòng khám chuyên khoa đến đa khoa quy mô vừa và nhỏ.'],
  ['imgVector6.svg', 'Đúng chuẩn Bộ Y Tế', 'Bệnh án điện tử theo Thông tư 46/2018/TT-BYT, mã hóa ICD-10'],
  ['imgDollar.svg', 'Chi phí rõ ràng', 'Biết rõ chi phí sử dụng ngay từ đầu, không phát sinh các khoản phí không rõ ràng.'],
  ['imgVector7.svg', 'Hỗ trợ 24/7', 'Đội ngũ eChart đồng hành hỗ trợ kỹ thuật và đào tạo 24/7'],
]

export function ReasonCards({ principles = false }) {
  return <div className={`n-reason-grid ${principles ? 'n-about-principle-cards' : ''}`}>
    {reasons.map(([icon, title, detail], index) => <article key={title}>
      <DesignIcon name={icon} className="n-reason-icon" />
      <h3>{title}</h3>
      <p>{principles && index === 3 ? <>Đội ngũ eChart đồng hành<br />hỗ trợ  kỹ thuật và đào tạo 24/7</> : detail}</p>
    </article>)}
  </div>
}

export default function ReasonsSection() {
  return <section className="n-section n-reasons" aria-labelledby="n-reasons-title">
    <div className="n-container">
      <div className="n-heading n-heading-center">
        <h2 id="n-reasons-title">Lý do nên lựa chọn eChart</h2>
        <p>Chúng tôi sẽ luôn đồng hành cùng bạn trong suốt quá trình thay đổi, bởi vì chúng tôi thành công khi bạn thành công</p>
      </div>
      <ReasonCards />
    </div>
  </section>
}
