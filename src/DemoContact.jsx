import { useState } from 'react'
import DesignIcon from './components/DesignIcon'
// Local province/ward snapshot: https://provinces.open-api.vn/api/v2/?depth=2
import demoLocations from './assets/demo-locations.json'
import './DemoContact.css'

const demoBenefits = [
  ['Tập trung vào những gì phòng khám của bạn thực sự cần', 'Tìm hiểu nhu cầu, quy mô và cách phòng khám đang vận hành để tập trung Demo vào những chức năng phù hợp.'],
  ['Trải nghiệm quy trình khám bệnh trực tiếp trên eChart', 'Theo dõi một quy trình từ tiếp nhận bệnh nhân, khám bệnh, chẩn đoán và điều trị đến khi hoàn tất buổi khám'],
  ['Tìm hiểu cách eChart quản lý dữ liệu bệnh nhân theo thời gian', 'Xem cách tiền sử, sinh hiệu, chẩn đoán, đơn thuốc và kết quả lâm sàng được lưu trữ xuyên suốt qua nhiều lần khám.'],
  ['Trao đổi về triển khai và hỗ trợ', 'Tìm hiểu cách thiết lập hệ thống, tùy chỉnh theo chuyên khoa, đào tạo và hỗ trợ phòng khám trong quá trình sử dụng.'],
]

export default function DemoContact() {
  const [province, setProvince] = useState('')
  const [ward, setWard] = useState('')
  const [previewMessage, setPreviewMessage] = useState('')
  const wards = demoLocations.find((location) => String(location.code) === province)?.wards || []
  return <section className="n-demo n-container" aria-labelledby="n-demo-title">
    <div className="n-demo-copy">
      <h1 id="n-demo-title">eChart có thể mang lại giá trị gì cho phòng khám của bạn</h1>
      <div className="n-demo-benefits">
        <h2>Những gì bạn sẽ nhận được trong buổi demo</h2>
        <ul>{demoBenefits.map(([title, detail]) => <li key={title}>
          <DesignIcon name="demo-check.svg" className="n-demo-check" />
          <div><h3>{title}</h3><p>{detail}</p></div>
        </li>)}</ul>
      </div>
    </div>
    <form className="n-demo-form" onSubmit={(event) => {
      event.preventDefault()
      setPreviewMessage('Thông tin chưa được gửi. Biểu mẫu hiện đang ở chế độ xem trước.')
    }} onChange={() => setPreviewMessage('')}>
      <div className="n-demo-form-heading">
        <h2>Đặt lịch demo tính năng</h2>
        <p>Để lại thông tin đơn vị, đội ngũ eCHart sẽ liên hệ và demo tính năng phù hợp với bạn</p>
      </div>
      <p className="n-demo-required"><span>*</span> Tất cả các trường thông tin đều bắt buộc</p>
      <div className="n-demo-fields">
        <label className="n-demo-field" htmlFor="demo-name">Họ và tên
          <input id="demo-name" name="fullName" autoComplete="name" placeholder="VD: Nguyễn Văn A" required pattern=".*\S.*" />
        </label>
        <label className="n-demo-field" htmlFor="demo-clinic">Tên cơ sở khám bệnh
          <input id="demo-clinic" name="clinicName" autoComplete="organization" placeholder="VD: Phòng khám Hạnh Phúc" required pattern=".*\S.*" />
        </label>
        <fieldset className="n-demo-scale">
          <legend>Quy mô cơ sở khám bệnh</legend>
          <div><label><input type="radio" name="clinicScale" value="single" required />Đơn vị đơn lẻ</label><label><input type="radio" name="clinicScale" value="chain" required />Chuỗi nhiều cơ sở</label></div>
        </fieldset>
        <div className="n-demo-field-pair">
          <label className="n-demo-field" htmlFor="demo-province">Tỉnh/ Thành phố
            <select id="demo-province" name="province" autoComplete="address-level1" required value={province} onChange={(event) => { setProvince(event.target.value); setWard('') }}>
              <option value="" disabled>Chọn tỉnh/TP</option>
              {demoLocations.map((location) => <option value={location.code} key={location.code}>{location.name}</option>)}
            </select>
          </label>
          <label className="n-demo-field" htmlFor="demo-ward">Phường/Xã
            <select id="demo-ward" name="ward" autoComplete="address-level2" required value={ward} disabled={!province} onChange={(event) => setWard(event.target.value)}>
              <option value="" disabled>Chọn phường/xã</option>
              {wards.map((location) => <option value={location.code} key={location.code}>{location.name}</option>)}
            </select>
          </label>
        </div>
        <div className="n-demo-field-pair">
          <label className="n-demo-field" htmlFor="demo-phone">Số điện thoại
            <input id="demo-phone" name="phone" type="tel" autoComplete="tel" placeholder="VD: 0912 345 789" required pattern="[+0-9 ]{9,20}" />
          </label>
          <label className="n-demo-field" htmlFor="demo-email">Email
            <input id="demo-email" name="email" type="email" autoComplete="email" placeholder="VD: email@example.com" required />
          </label>
        </div>
      </div>
      <button type="submit" className="n-button">Gửi thông tin</button>
      {previewMessage && <p className="n-demo-status" role="status">{previewMessage}</p>}
    </form>
  </section>
}
