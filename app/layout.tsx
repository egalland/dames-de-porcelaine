import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'Dames de porcelaine — Le bal des éclats',description:'Un jeu de dames roguelite. Collectionnez les reliques et invitez un ami avec un code.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
