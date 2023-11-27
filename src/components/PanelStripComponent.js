import ImageFromAPI from './ImageFromAPI';

const PanelStripComponent = ({apiUrl,data,numberOfImages}) => {

    let imageUrls = [];
    for(let i=1;i<=numberOfImages;i++)
    imageUrls.push(apiUrl);
    // console.log(imageUrls.length());
  return (
    <div className="image-panel-layout">
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="image-panel">
          <ImageFromAPI apiUrl={imageUrl} data={data}/>
        </div>
      ))}
    </div>
  );
};

export default PanelStripComponent;
