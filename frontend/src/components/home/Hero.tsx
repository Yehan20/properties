import Search from "./Search"

const Hero = () => {
    return (

        <section className="bg-center bg-no-repeat bg-[url('https://scontent.fcmb8-1.fna.fbcdn.net/v/t39.30808-6/464858951_946317997519553_8730418094352971484_n.jpg?stp=dst-jpg_p526x395_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_zuFNW1_wfYQ7kNvgHBuUmy&_nc_zt=23&_nc_ht=scontent.fcmb8-1.fna&_nc_gid=Af9dW0NvSsSMSXWcUl3LlC3&oh=00_AYCZtQa-m-WeXMEskEHbprtEc7yF7Uvy3WC2FZbG4g56zA&oe=6770489B')] bg-gray-500 bg-cover bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-2xl font-semibold tracking-tight leading-none text-white md:text-3xl lg:text-6xl">
                    Looking to Buy or Rent a Property <br />
                    Find your Dream Home
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-300 mx-auto w-20 lg:text-xl sm:px-16 lg:px-48 border-b-2 rounded"></p>
              

                  <Search/>

            </div>
        </section>
    )
}

export default Hero