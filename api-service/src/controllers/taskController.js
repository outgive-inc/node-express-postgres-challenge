const { Task, SubTask } = require("../models");

module.exports = {
  GetTaskList: async (req, res) => {
    try {
      const tasks = await Task.findAll({
        include: [{ model: SubTask, as: "SubTasks" }],
      });
      res.status(200).send({ code: 200, data: tasks, message: "Success" });
    } catch (error) {
      res.send(error);
    }
  },

  CreateTask: async (req, res) => {
    try {
      console.log("req.bodu", req.body);
      if (!req.body.title) {
        return res
          .status(400)
          .send({ data: [], message: "Title is requied", success: false });
      }

      const task = await Task.create(req.body);
      console.log("task", task);
      if (task) {
        res
          .status(200)
          .send({ data: task, message: "Task added", success: true });
      }
    } catch (error) {
      return res.send(error);
    }
  },

  DeleteTask: async (req, res) => {
    try {
      const task = await Task.findById(req.query.taskId);

      if (!task) {
        return res.status(400).send({
          message: "Task not found",
        });
      }

      await task.destroy();
      res
        .status(200)
        .send({ data: [], message: "Task deleted", success: true });
    } catch (error) {
      res.send(error);
    }
  },
  UpdateTask: async (req, res) => {
    try {
      const task = await Task.findById(req.body.taskId);

      if (!task) {
        return res.status(400).send({
          message: "Task not found",
        });
      }
      const updatedTask = await task.update(req.body);
      const { taskId, completed } = updatedTask;

      if (req.body.completed) {
        await SubTask.update({ completed }, { where: { taskId } });
      }

      res
        .status(200)
        .send({ data: updatedTask, message: "Task updated", success: true });
    } catch (error) {
      res.send(error);
    }
  },

  // GetProductById: async (req, res) => {
  //     try {
  //         const product = await Product.findById(req.params.id).populate(
  //             'category'
  //         );
  //         if (!product) {
  //             return res.status(500).send('Product not found');
  //         }
  //         res.status(200).send(product);
  //     } catch (error) {
  //         res.send(error);
  //     }
  // },
  // PostProduct: async (req, res) => {
  //     try {
  //         const category = await Category.findById(req.body.category);
  //         if (!category) {
  //             return res.status(500).send('Invalid category');
  //         }
  //         const file = req.file;
  //         if (!file) {
  //             return res.status(500).send('File not found');
  //         }
  //         const fileName = file.filename;
  //         const basePath = `${req.protocol}://${req.get(
  //             'host'
  //         )}/public/upload/`;
  //         let product = new Product({
  //             category: req.body.category,
  //             image: `${basePath}${fileName}`,
  //             ...req.body,
  //         });

  //         product = await product.save();
  //         if (product) {
  //             res.status(201).json(product);
  //         }
  //     } catch (error) {
  //         res.status(500).json({
  //             error: err,
  //             success: false,
  //         });
  //     }
  // },
  // UpdateProduct: async (req, res) => {
  //     try {
  //         const category = await Category.findById(req.body.category);
  //         if (!category) {
  //             return res.status(500).send('Invalid category');
  //         }

  //         const product = await Product.findById(req.params.id);
  //         if (!product) {
  //             return res.status(500).send('Product not found');
  //         }

  //         const file = req.file;
  //         let imagePath;
  //         if (file) {
  //             const fileName = file.filename;
  //             const basePath = `${req.protocol}://${req.get(
  //                 'host'
  //             )}/public/upload/`;
  //             imagePath = `${basePath}${fileName}`;
  //         } else {
  //             imagePath = product.image;
  //         }
  //         const updatedProduct = await Product.findByIdAndUpdate(
  //             req.params.id,
  //             {
  //                 image: imagePath,
  //                 ...req.body,
  //             },
  //             { new: true }
  //         );
  //         if (!updatedProduct) {
  //             return res.status(500).send('Product not found');
  //         }
  //         res.status(200).send(updatedProduct);
  //     } catch (error) {
  //         res.send(error);
  //     }
  // },

  // DeleteProduct: async (req, res) => {
  //     try {
  //         const product = await Product.findByIdAndRemove(req.params.id);
  //         if (!product) {
  //             return res.status(500).send('Product not found');
  //         }
  //         res.status(200).json({
  //             success: true,
  //             message: 'Product deleted successfully',
  //         });
  //     } catch (error) {
  //         res.send(error);
  //     }
  // },
  // GetProductCount: async (req, res) => {
  //     const productCount = await Product.countDocuments((count) => count);
  //     if (!productCount) {
  //         return res.status(500).send('Not found');
  //     }
  //     res.status(200).json({
  //         count: productCount,
  //     });
  // },

  // GetFeaturedProducts: async (req, res) => {
  //     try {
  //         const count = req.params.count ? req.params.count : 0;
  //         const products = await Product.find({ isFeatured: true }).limit(
  //             +count
  //         );
  //         if (!products) {
  //             return res.status(500).send('No products found');
  //         }
  //         res.status(200).send(products);
  //     } catch (error) {
  //         res.send(error);
  //     }
  // },
  // PostMultipleImages: async (req, res) => {
  //     try {
  //         const files = req.files;
  //         let imagePaths = [];
  //         const basePath = `${req.protocol}://${req.get(
  //             'host'
  //         )}/public/upload`;
  //         if (files) {
  //             files.map((file) => {
  //                 imagePaths.push(`${basePath}${file.filename}`);
  //             });
  //         }
  //         const product = await Product.findByIdAndUpdate(
  //             req.params.id,
  //             {
  //                 images: imagePaths,
  //             },
  //             { new: true }
  //         );
  //         if (!product) {
  //             return res.status(500).send('Product not found');
  //         }
  //         res.send(product);
  //     } catch (error) {
  //         return res.send(error);
  //     }
  // },
};
