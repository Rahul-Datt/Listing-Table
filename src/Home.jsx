import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const Home = () => {
    const users = useSelector(state => state.users);

    const [search, setSearch] = useState('');

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 10;

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';
            if (sortConfig.direction === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(filteredUsers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, 'Users_List.xlsx');
    };

    return (
        <div className='container'>
            <h2>LISTING TABLE</h2>

            <Link to={'/create'}>
                <button className='btn btn-primary my-3'>Add User</button>
            </Link>

            <button className='btn btn-success my-3 mx-1' onClick={handleDownload}>Download</button>

            <input 
                type="text" 
                placeholder="Search by name, email, or phone" 
                className="form-control mb-3" style={{width: '300px'}} 
                value={search} 
                onChange={handleSearchChange} 
            />

            <table className='table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>
                            ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('firstName')}>
                            First Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('lastName')}>
                            Last Name {sortConfig.key === 'lastName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('phone')}>
                            Phone No. {sortConfig.key === 'phone' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('email')}>
                            Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No users found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Home;
