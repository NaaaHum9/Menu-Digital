import './Header.css'

export default function Header() {
    return (
        <header className='header'>
            <div className='header-section'>
                <p className='brand'>Cocina Domi</p>
            </div>
            <button className='login-button'>Iniciar secion</button>
        </header>
    );
}