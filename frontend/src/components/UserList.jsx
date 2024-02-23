import { useFetchUsersQuery } from "../../store";
import "../styles/list.css";

function UserList() {
    let usersList = "";
    let errorContainer = "";
    const { data, error, isLoading } = useFetchUsersQuery(); // Fetch user data from the store.
    const dummyArray = Array(8) // Create a dummy array for generating the skeleton loader
        .fill(null)
        .map((_, index) => index + 1);

    if (isLoading) {
        // If data is loading, display skeleton loader
        usersList = dummyArray.map((index) => (
            <div className="skeleton-inner-container" key={index}>
                <p className="skeleton-name">Loading...</p>
                <p className="skeleton-email">Loading...</p>
                <div className="skeleton-image-container"></div>
            </div>
        ));
    }

    if (error) {
        errorContainer = (
            <h1>Error on request please check the network or request</h1>
        );
    }

    if (!isLoading) {
        // If data is loaded, display the user list.
        usersList = data.data.map((user) => {
            return (
                <div className="user-inner-container" key={user.id}>
                    <p className="user-name">
                        <strong>{user.first_name}</strong>
                    </p>
                    <p className="user-email">{user.email}</p>
                    <img
                        key={user.avatar}
                        src={user.avatar}
                        alt="Reqres User Picture"
                        draggable="false"
                        loading="lazy"
                    />
                </div>
            );
        });
    }

    return (
        <div className="users-list-container">
            <h1>Hello ReqRes users!</h1>
            {error && errorContainer}
            <div className="user-outer-container">{usersList}</div>
        </div>
    );
}

export default UserList;
