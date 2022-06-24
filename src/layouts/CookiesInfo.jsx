import { useState, useEffect } from 'react';
import cookies from 'js-cookies';
import {cookieExpires} from '../scripts/dateFunctions';

export default function CookiesInfo() {

	const [cookiesAccepted, setCookiesAccepted] = useState(null);
	
	useEffect(() => {
    const info = cookies.getItem('info');
		if(info)setCookiesAccepted(true);
		else setCookiesAccepted(false);
  });

	const handleButton = () =>{
		document.cookie = `info=true; path=/; expires=${cookieExpires()}`;
		setCookiesAccepted(true);
	};

  return (
    <>
			{!cookiesAccepted ?
				<div className='info-cookies'>
					<div className='info-cookies__content'>
						<div className='info-cookies__warning'>
							<div className='info-cookies__text'>
								Strona korzysta z plików cookies w celu realizacji usług i zgodnie z Polityką Prywatności. Możesz określić warunki przechowywania lub dostępu do plików cookies w Twojej przeglądarce.
							</div>
							<div onClick={()=> handleButton()} className='info-cookies__button'>
								Akceptuję
							</div>
						</div>
					</div>
				</div>
			: null}
		</>
  );
};
