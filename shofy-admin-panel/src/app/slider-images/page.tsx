import Wrapper from "@/layout/wrapper";
import AddImageArea from "../components/slider-image/add-slideimg";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

//So, your website's about page corresponds to the app/about/page.js file,
//but it's the route /about that users visit in their browser.

const SliderPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Brands" subtitle="Brands" />
        {/* breadcrumb end */}

        {/*add category area start */}
        {/*This is a React component */}
        <AddImageArea />
       
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default SliderPage;
