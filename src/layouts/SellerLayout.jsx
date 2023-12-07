import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SellerLayout = ({ children }) => {
    return (
        <div className="body d-flex justify-content-center align-items-center" style={{ backgroundColor: '#B31312', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', height: '100vh'}}>
            <div className="container-md p-0 pb-5" style={{ maxWidth: '390px', backgroundColor: 'white', margin: 'auto', height: '100%', overflow: 'auto'}}>

            { children }

            <div style={{ position: 'fixed', top: '100%', left: '50%', transform: 'translate(-50%, -50%)', width: '390px', height: '120px', backgroundColor: '#EEE2DE', boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)'}}>
                    <div className="pt-3" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to="/homepage">
                            <Icon icon="ep:menu" color="#b31312" width="30" />
                        </Link>
                        <Link to="/homepage/dashboard">
                            <Icon icon="material-symbols:team-dashboard" color="#b31312" width="30" />
                        </Link>
                        {/*
                        <Link to="/homepage/dashboad/chat">
                            <Icon icon="material-symbols:chat" color="#b31312" width="30" />  
                        </Link>
                        */}
                        <Link to="/homepage/dashboard/produk-saya">
                            <Icon icon="material-symbols:package-rounded" color="#b31312" width="30" />
                        </Link>
                        <Link to="/homepage/dashboard/profile">
                            <Icon icon="iconamoon:profile-fill" color="#b31312" width="30" />            
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerLayout;