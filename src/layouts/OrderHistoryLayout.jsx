import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrderHistoryLayout = ({ children }) => {
    return (
        <div className="body d-flex justify-content-center align-items-center" style={{ backgroundColor: '#B31312', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', height: '100vh' }}>
            <div className="container-md p-0 pb-5" style={{ maxWidth: '390px', backgroundColor: 'white', margin: 'auto', height: '100%', overflow: 'auto'}}>
                {children}
            </div>

            <div style={{ position: 'fixed', top: '100%', left: '50%', transform: 'translate(-50%, -50%)', width: '390px', height: '120px', backgroundColor: '#EEE2DE', boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)'}}>
                <div className="pt-3" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Link to="/homepage/dashboard/riwayat/pemrosesan">
                      <Icon icon="lucide:package" color="#2b2a4c" width="30" />                            
                    </Link>
                    <Link to="/homepage/dashboard/riwayat/pembatalan">
                        <Icon icon="lucide:package-x" color="#2b2a4c" width="30" />                            
                    </Link>
                    <Link to="/homepage/dashboard/riwayat/pengembalian">
                        <Icon icon="octicon:package-dependencies-16" color="#2b2a4c" width="30" height="30" />                            
                    </Link>
                    <Link to="/homepage/dashboard/riwayat/penilaian">
                        <Icon icon="ic:outline-rate-review" color="#2b2a4c" width="30" />                            
                    </Link>
                </div>
            </div> 
        </div>
    )
}

export default OrderHistoryLayout; 