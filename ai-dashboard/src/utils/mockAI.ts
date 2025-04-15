export const mockGenerateDraft = (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`This is a mock draft generated based on: "${prompt}"`);
    }, 1200);
  });
};

export const mockSummarize = (content: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Summary: This is a brief summary of your report content ${content}`
      );
    }, 1000);
  });
};
