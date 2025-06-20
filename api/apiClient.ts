import axiosInstance from './axios';

// get all active model names and desc
export const getModelNames = async () => {
  try {
    const response = await axiosInstance.get('/qchat/models');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
};

// get response from the llm
export const getResponseFromModel = async ({
  selectedModel,
  message,
}: {
  selectedModel: string;
  message: string;
}) => {
  try {
    const response = await axiosInstance.post('/qchat/conversations', {
      modelName: selectedModel,
      message: message,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to send response: ${error}`);
  }
};
