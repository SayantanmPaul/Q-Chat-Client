import BrandButton from '../ui/BrandButton';

const SignUpButton = () => {
  return (
    <div className="w-full min-w-32 lg:min-w-36">
      <BrandButton
        text="Log in/ Sign up"
        height={10}
        position="center"
        boldText={true}
      />
    </div>
  );
};

export default SignUpButton;
