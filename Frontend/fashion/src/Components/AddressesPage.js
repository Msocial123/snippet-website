// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AddressesPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const uid = storedUser?.UID;

//   useEffect(() => {
//     if (uid) fetchAddresses();
//     // eslint-disable-next-line
//   }, [uid]);

//   const fetchAddresses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/api/addresses/user/${uid}`);
//       setAddresses(res.data);
//     } catch (err) {
//       setError("Failed to load addresses.");
//     }
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddAddress = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
//       setError("Please fill all fields.");
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:5000/api/addresses/user/${uid}`, form);
//       setSuccess("Address added!");
//       setForm({
//         name: "",
//         phone: "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//       });
//       fetchAddresses();
//     } catch (err) {
//       setError("Failed to add address.");
//     }
//   };

//   return (
//     <div className="profile-card">
//       <h2 className="profile-title">Your Addresses</h2>
//       <form className="address-form" onSubmit={handleAddAddress} style={{ marginBottom: 24 }}>
//         <div className="address-form-row">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={form.address}
//           onChange={handleChange}
//           required
//         />
//         <div className="address-form-row">
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={form.city}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="state"
//             placeholder="State"
//             value={form.state}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="pincode"
//             placeholder="Pincode"
//             value={form.pincode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="edit-btn">Add Address</button>
//       </form>
//       {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
//       {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
//       <div>
//         {loading ? (
//           <p>Loading addresses...</p>
//         ) : addresses.length === 0 ? (
//           <p>No addresses saved yet.</p>
//         ) : (
//           <ul style={{ padding: 0, listStyle: "none" }}>
//             {addresses.map(addr => (
//               <li key={addr.AddressID} style={{
//                 border: "1px solid #eee",
//                 borderRadius: 8,
//                 padding: 16,
//                 marginBottom: 12,
//                 background: "#fafbfc"
//               }}>
//                 <div><strong>{addr.Name}</strong> ({addr.Phone})</div>
//                 <div>{addr.Address}, {addr.City}, {addr.State} - {addr.Pincode}</div>
//                 <div style={{ fontSize: 12, color: "#888" }}>Added: {new Date(addr.CreatedAt).toLocaleDateString()}</div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddressesPage;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CheckoutAddressSection = ({ onAddressSelect }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const uid = storedUser?.UID;

//   useEffect(() => {
//     if (uid) fetchAddresses();
//     // eslint-disable-next-line
//   }, [uid]);

//   const fetchAddresses = async () => {
//     const res = await axios.get(`http://localhost:5000/api/addresses/user/${uid}`);
//     setAddresses(res.data);
//     if (res.data.length > 0) {
//       setSelectedId(res.data[0].AddressID); // Default: first address
//       onAddressSelect(res.data[0]);
//     }
//   };

//   const handleSelect = (addr) => {
//     setSelectedId(addr.AddressID);
//     onAddressSelect(addr);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddAddress = async (e) => {
//     e.preventDefault();
//     await axios.post(`http://localhost:5000/api/addresses/user/${uid}`, form);
//     setForm({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
//     setShowAddForm(false);
//     fetchAddresses();
//   };

//   return (
//     <div>
//       <h3>Select Delivery Address</h3>
//       {addresses.length === 0 && <p>No addresses found. Please add one.</p>}
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {addresses.map(addr => (
//           <li
//             key={addr.AddressID}
//             style={{
//               border: selectedId === addr.AddressID ? "2px solid #ffa726" : "1px solid #eee",
//               borderRadius: 8,
//               padding: 16,
//               marginBottom: 12,
//               background: "#fafbfc",
//               cursor: "pointer"
//             }}
//             onClick={() => handleSelect(addr)}
//           >
//             <input
//               type="radio"
//               checked={selectedId === addr.AddressID}
//               onChange={() => handleSelect(addr)}
//               style={{ marginRight: 8 }}
//             />
//             <strong>{addr.Name}</strong> ({addr.Phone})<br />
//             {addr.Address}, {addr.City}, {addr.State} - {addr.Pincode}
//           </li>
//         ))}
//       </ul>
//       <button onClick={() => setShowAddForm(!showAddForm)} className="edit-btn" type="button">
//         {showAddForm ? "Cancel" : "Add New Address"}
//       </button>
//       {showAddForm && (
//         <form className="address-form" onSubmit={handleAddAddress} style={{ marginTop: 16 }}>
//           <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
//           <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
//           <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
//           <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
//           <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
//           <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
//           <button type="submit" className="edit-btn">Save Address</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default CheckoutAddressSection;


import React, { useEffect, useState } from "react";
import axios from "axios";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const uid = storedUser?.UID;

  useEffect(() => {
    if (uid) fetchAddresses();
    // eslint-disable-next-line
  }, [uid]);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/addresses/user/${uid}`);
      setAddresses(res.data);
    } catch (err) {
      setError("Failed to load addresses.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      setError("Please fill all fields.");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/addresses/user/${uid}`, form);
      setSuccess("Address added!");
      setForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
      fetchAddresses();
    } catch (err) {
      setError("Failed to add address.");
    }
  };

  return (
    <div className="profile-card">
      <h2 className="profile-title">Your Addresses</h2>
      <form className="address-form" onSubmit={handleAddAddress} style={{ marginBottom: 24 }}>
        <div className="address-form-row">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <div className="address-form-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="edit-btn">Add Address</button>
      </form>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
      <div>
        {loading ? (
          <p>Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p>No addresses saved yet.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {addresses.map(addr => (
              <li key={addr.AddressID} style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                background: "#fafbfc"
              }}>
                <div><strong>{addr.Name}</strong> ({addr.Phone})</div>
                <div>{addr.Address}, {addr.City}, {addr.State} - {addr.Pincode}</div>
                <div style={{ fontSize: 12, color: "#888" }}>Added: {new Date(addr.CreatedAt).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;