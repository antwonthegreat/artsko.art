import api from '../api/api';
import { useState, useEffect, useMemo } from "react";
import LoadingIcons from 'react-loading-icons'
import { Footer } from '../components/footer'

const themes = {
  'dark': {
    caption:{
      fontSize:16,
      color:'#cccccc'
    },
    title:{
      fontSize:20,
      fontWeight:'bold',
      color:'#cccccc'
    },
    textLighter:{
      color:'#aaaaaa'
    },
    backgroundColor:'#111111',
    accentColor:'#cc5151'
  },
  'light': {
    caption:{
      fontSize:16,
      color:'#999999'
    },
    title:{
      fontSize:20,
      fontWeight:'bold',
      color:'#999999'
    },
    textLighter:{
      color:'#aaaaaa'
    },
    backgroundColor:'#ffffff',
    accentColor:'#cc5151'
  }
}

function Commissions() {


    const [commission, setCommission] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    

      const theme = useMemo(()=>{
        const urlTheme = themes[new URLSearchParams(window.location.search).get("theme")];
        return urlTheme ?? themes['dark'];
      },[])

    useEffect(() => {
      const f = async()=>{
        const commissionId = new URLSearchParams(window.location.search).get("id");
        if(!commissionId){
          return;
        }
        const response = await api.get(
          `/Commissions?$select=Name,Description&$filter=Id eq ${commissionId}&$expand=CommissionImages($orderBy=IsMain desc,Id asc;$filter=not NSFW;$select=Height,Width,Url;$top=1),Options($select=CurrentPrice;$filter=not IsArchived),Artist($select=Username,ProfileUrl),Category($select=Name)`,
        );
        const commission = response?.data?.value?.[0];
        setCommission(commission);
        setIsLoading(false);
      };
      f();
    }, []);

    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

   return (
     <div>
      <div style={{padding:16,marginTop:80, display:'flex',flexDirection:'column'}}>
        {  
          isLoading ? 
            <LoadingIcons.Oval style={{alignSelf:'center'}} stroke={theme.accentColor} />
          :
          !commission
          ? <div style={{minHeight:100, display:'flex',alignItems:'center',justifyContent:'center'}}>
            Sorry We couldn't find that commission
          </div>:
          (<div style={{display:'flex',flexDirection:'column'}}>
            
            <div
          style={
            {
              width: '100%',
              display:'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor:theme.backgroundColor
            }
          }
        >
          <img
            alt="artist's profile"
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
              borderWidth: 1,
              margin: 8,
            }}
            src={
              commission?.Artist?.ProfileUrl
                ??  'img/portfolio/01-large.jpg'
            }
          />
          <div style={{ display:'flex',flexDirection: 'column', marginRight: 8,backgroundColor:theme.backgroundColor }}>
            <div style={{ fontWeight: 'bold',...theme.caption }}>{commission?.Artist?.Username}</div>
            <div style={{ display:'flex',flexDirection: 'row' }}>
              <div style={{...theme.caption}}>{commission?.Name}</div>
              <div style={{...theme.caption,...theme.textLighter}}>
                {commission?.Category?.Name ? ` • ${commission?.Category?.Name}` : ''}
              </div>
            </div>
          </div>
        </div>
        {
          commission?.CommissionImages[0] ? 
        <div style={{width:'100%',textAlign:'center'}}>
          <img style={{objectFit:'contain',maxWidth:commission?.CommissionImages[0]?.Width}} width='100%'  alt={commission?.Name} src={commission?.CommissionImages?.[0]?.Url}/>
        </div>
        : null
        }
        {commission?.Description ? (
          <div style={{display:'flex',justifyContent:'center'}}>
              <div style={{ padding: 8,...theme.caption }}>{commission.Description}</div>
          </div>
        ) : null}
        {commission?.Options?.length ? (
          <div
            style={{
              display:'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: 8,
              justifyContent: 'center',
            }}
          >
            <div style={{...theme.caption}}>Available for {commission?.Options.length === 1 ? currencyFormatter.format(commission.Options[0].CurrentPrice) : `${currencyFormatter.format(commission.Options.slice(0)
              .sort((a, b) => a.CurrentPrice - b.CurrentPrice)[0]
              .CurrentPrice)} - ${currencyFormatter.format(commission.Options.slice(0)
                .sort((a, b) => b.CurrentPrice - a.CurrentPrice)[0]
                .CurrentPrice)}`}
            </div>

          </div>
        ) : null}
          <div style={{display:'flex', justifyContent:'center', ...theme.title}}>To purchase, download the Artsko app:</div>
          <div style={{display:'flex', justifyContent:'center'}}>
              <img style={{margin:8}} alt="ios app store" src="/img/ios_app_store.svg"/>
              <img style={{margin:8}} height="58" alt="android app store" src="/img/android_app_store.png"/>
            </div>

        </div>)}
        
        </div>
        <Footer/>
      </div>
    );
  }

  export default Commissions;