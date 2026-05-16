# Use a base image with Node and Android SDK pre-installed
# This is a large image but necessary for local APK builds
FROM reactnativecommunity/react-native-android:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source
COPY . .

# Ensure gradlew is executable
RUN chmod +x android/gradlew

# Default command: Prebuild and then build release APK
# The output will be expected to be picked up via volume mapping to /app/android/app/build/outputs/apk/release/
CMD npx expo prebuild --platform android --no-install && \
    cd android && \
    ./gradlew assembleRelease && \
    cp app/build/outputs/apk/release/app-release.apk /output/app-release.apk
