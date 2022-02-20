import CuratorWidget from "./curator";

export const Gallery = (props) => {

  return (
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Gallery</h2>
          <p>
            Check out the works of our recently featured artists
          </p>
        </div>
        <CuratorWidget feedId="bce08eab-33dd-4551-9f8c-02dbcd9a9c09"/>
      </div>
    </div>
  )
}
