import { Footer } from './footer'

export const Contact = (props) => {

  return (
    <div>
      <div id='contact' className='text-center'>
        <div className='container'>
          <div className='section-title'>
            <a href={`mailto:${props?.data?.email}`}><h4>{props.data ? props.data.email : 'loading'}</h4></a>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a target="_blank" rel="noreferrer" href={props.data ? props.data.instagram : '/'}>
                      <i className='fa fa-instagram'></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href={props.data ? props.data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href={props.data ? props.data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
