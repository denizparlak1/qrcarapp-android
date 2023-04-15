import {API_URLS} from "../api/BaseUrl";
import { lookup } from 'react-native-mime-types';

const getUserDataApi = async (userId) => {
    const response = await fetch(API_URLS['getUserData']+`${userId}`);
    const data = await response.json()
    return data;
};


const updateUserEmailApi = async (userId,email) => {
    const response = await fetch(API_URLS['updateUserEmail'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};

const updateUserMessageApi = async (userId,message) => {
    const response = await fetch(API_URLS['updateUserMessage'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            message: message
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };

};

const updateUserPlateApi = async (userId,plate) => {
    const response = await fetch(API_URLS['updateUserPlate'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            plate: plate
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};

const updateUserPhoneApi = async (userId,phone) => {
    const response = await fetch(API_URLS['updateUserPhone'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            phone: phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });

    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};

const updateUserProfileApi = async (userId, uri) => {
    const mimeType = lookup(uri) || 'image/jpeg'; // Get MIME type or default to 'image/jpeg'
    const formData = new FormData();

    formData.append('file', {
        uri,
        name: `photo.${mimeType.split('/')[1]}`, // Set the name to include the appropriate file extension
        type: mimeType, // Set the type to the determined MIME type
    });

    try {
        const response = await fetch(API_URLS['updatePhoto']+`${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error updating photo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


const updateUserTelegramLinkApi = async (userId,telegram) => {
    const response = await fetch(API_URLS['updateTelegramLink'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            telegram: telegram
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};


const updateUserTelegramPermissionApi = async (userId,permission) => {
    const response = await fetch(API_URLS['updateTelegramPermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            permission: permission
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};

const updateUserWhatsappPermissionApi = async (userId,permission) => {
    const response = await fetch(API_URLS['updateWhatsappPermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            permission: permission
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};

const updateUserPhonePermissionApi = async (userId,permission) => {
    const response = await fetch(API_URLS['updatePhonePermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            permission: permission
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};

const updateUserPasswordApi = async (userId,password) => {
    const response = await fetch(API_URLS['updatePassword'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const jsonResponse = await response.json();
    return { ...jsonResponse, status: response.status };
};



export { getUserDataApi,updateUserEmailApi,updateUserMessageApi,updateUserTelegramPermissionApi,
    updateUserPlateApi,updateUserPhoneApi,updateUserProfileApi,
    updateUserTelegramLinkApi,updateUserWhatsappPermissionApi,updateUserPhonePermissionApi,updateUserPasswordApi };