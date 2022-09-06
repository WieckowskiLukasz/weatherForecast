import React, { useState, useEffect } from 'react';
import cookies from 'js-cookies';
import {cookieExpires} from '../scripts/dateFunctions.ts';
import Languages from '../layouts/Languages.tsx';

export default function CookiesInfo() {
	const [cookiesAccepted, setCookiesAccepted] = useState<boolean>();
	
	useEffect(() => {
    const info = cookies.getItem('info');
		if(info)setCookiesAccepted(true);
		else setCookiesAccepted(false);
  },[]);

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
								<Languages text={'cookiesInfo'}/>
							</div>
							<div onClick={()=> handleButton()} className='info-cookies__button'>
								<Languages text={'acceptButton'}/>
							</div>
						</div>
					</div>
				</div>
			: null}
		</>
  );
};
