import { useEffect, useState } from "react";

function AccountManagement({active,handleActive}) {
  const [isActive, setIsActive] = useState(active);

  const handleToggleStatus = () => {
    if (isActive === "Active") {
      handleActive("inactive");
      setIsActive("Inactive");
    } else {
      handleActive("active");
      setIsActive("Active")
    }
  };
  
  useEffect(()=>{
    setIsActive(active)
  },[active])

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
      alert("Account deleted successfully.");
      
    }
  };

  return (
    <div className="p-4 flex gap-6">
      

      
    </div>
  );
}

export default AccountManagement;
