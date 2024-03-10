# File Lister (jn-file-list)

File Lister is a Node.js module that scans the current directory recursively, listing all files along with their last access and modification dates. It outputs this information to the console and saves it to a CSV file, sorted by the most recent access date. The dates are formatted as `yyyy-mm-dd hh:mm:ss` for clarity and consistency.

## Features

- Recursive directory scanning to list all files in the current directory and its subdirectories.
- Displays full file paths, last access dates, and last modification dates.
- Saves the file list to a CSV file, sorted by the most recent access date.
- Date formatting for easy reading and standardization.

## Getting Started

To get started with File Lister, clone this repository and install the required dependencies.

### Prerequisites

- Node.js (latest stable version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/file-lister.git
cd file-lister
```

2. Install the dependencies:

```bash
npm install
```

3. Make the main script executable (if on Unix-like systems):

```bash
chmod +x index.js
```

### Usage

To list all files and save them to a CSV file, simply run:

```bash
./index.js
```

Or, if you prefer:

```bash
node index.js
```

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [csv-writer](https://www.npmjs.com/package/csv-writer) - CSV writing utility

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://mit-license.org/) file for details.

## Acknowledgments

- Node.js community for the invaluable resources and libraries.
- Open-source contributors whose tools and libraries facilitated this project.