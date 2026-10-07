import { getDesignIcon } from '../media'

export default function DesignIcon({ name, className = '' }) {
  return <span className={`n-icon ${className}`}><img src={getDesignIcon(name)} alt="" /></span>
}
